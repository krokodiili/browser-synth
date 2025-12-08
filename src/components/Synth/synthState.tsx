import { createContext, useContext, useEffect, useReducer, useState } from "react";
import * as Tone from "tone";
import { PolySynth, Reverb, FeedbackDelay, Chorus } from "tone";

Tone.context.lookAhead = 0;

type Dispatch = (action: Action) => void;

export interface Track {
  id: number;
  octave: number;
  synth: PolySynth;
  volume: number;
}

export interface ReverbSettings {
  mix: number;
  decay: number;
  preDelay: number;
}

export interface DelaySettings {
  mix: number;
  delayTime: number;
  feedback: number;
}

export interface ChorusSettings {
  mix: number;
  depth: number;
  frequency: number;
}

export interface SynthState {
  tracks: Track[];
  selectedTrackId: number;
  dispatch: Dispatch;
  reverb: ReverbSettings;
  delay: DelaySettings;
  chorus: ChorusSettings;
}

export type Action =
  | { type: "OCTAVE_UP" }
  | { type: "OCTAVE_DOWN" }
  | { type: "CHANGE_VOLUME"; payload: number }
  | { type: "SELECT_TRACK"; payload: number }
  | { type: "SET_REVERB"; payload: Partial<ReverbSettings> }
  | { type: "SET_DELAY"; payload: Partial<DelaySettings> }
  | { type: "SET_CHORUS"; payload: Partial<ChorusSettings> }
  | {
      type: "LOAD_SETTINGS";
      payload: {
        tracks: { id: number; octave: number; volume: number }[];
        reverb: ReverbSettings;
        delay: DelaySettings;
        chorus: ChorusSettings;
      };
    };

const createTrack = (id: number): Track => ({
  id,
  octave: 4,
  synth: new Tone.PolySynth(),
  volume: 0,
});

const initialState: SynthState = {
  tracks: [createTrack(0), createTrack(1), createTrack(2), createTrack(3)],
  selectedTrackId: 0,
  dispatch: () => {},
  reverb: {
    mix: 0,
    decay: 1.5,
    preDelay: 0.01,
  },
  delay: {
    mix: 0,
    delayTime: 0.25,
    feedback: 0.3,
  },
  chorus: {
    mix: 0,
    depth: 0.5,
    frequency: 4,
  },
};

const synthReducer = (state: SynthState, action: Action): SynthState => {
  const currentTrack = state.tracks[state.selectedTrackId];
  const updateTrack = (updates: Partial<Track>) => {
    return state.tracks.map((track) =>
      track.id === state.selectedTrackId ? { ...track, ...updates } : track
    );
  };

  switch (action.type) {
    case "OCTAVE_UP":
      return {
        ...state,
        tracks: updateTrack({ octave: currentTrack.octave + 1 }),
      };
    case "OCTAVE_DOWN":
      return {
        ...state,
        tracks: updateTrack({ octave: currentTrack.octave - 1 }),
      };
    case "CHANGE_VOLUME":
      return {
        ...state,
        tracks: updateTrack({ volume: action.payload }),
      };
    case "SELECT_TRACK":
      return {
        ...state,
        selectedTrackId: action.payload,
      };
    case "SET_REVERB":
      return {
        ...state,
        reverb: { ...state.reverb, ...action.payload },
      };
    case "SET_DELAY":
      return {
        ...state,
        delay: { ...state.delay, ...action.payload },
      };
    case "SET_CHORUS":
      return {
        ...state,
        chorus: { ...state.chorus, ...action.payload },
      };
    case "LOAD_SETTINGS":
      return {
        ...state,
        tracks: state.tracks.map((track) => {
          const loadedTrack = action.payload.tracks.find(
            (t) => t.id === track.id
          );
          if (loadedTrack) {
            return {
              ...track,
              octave: loadedTrack.octave,
              volume: loadedTrack.volume,
            };
          }
          return track;
        }),
        reverb: action.payload.reverb,
        delay: action.payload.delay,
        chorus: action.payload.chorus,
      };
    default:
      return state;
  }
};
const SynthContext = createContext<SynthState>(initialState);

const SynthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(synthReducer, initialState);

  // Initialize FX Nodes
  const [reverb] = useState(() => new Reverb());
  const [delay] = useState(() => new FeedbackDelay());
  const [chorus] = useState(() => new Chorus());

  // Setup Audio Graph (One-time setup)
  useEffect(() => {
    // Chain: Synths -> Chorus -> Delay -> Reverb -> Destination
    chorus.connect(delay);
    delay.connect(reverb);
    reverb.toDestination();
    chorus.start();

    // Connect all synths to the start of the FX chain (Chorus)
    state.tracks.forEach((track) => {
      track.synth.set({
        oscillator: {
          type: "sine",
        },
      });
      // Ensure we don't have multiple connections if this runs again (though it shouldn't)
      track.synth.disconnect();
      track.synth.connect(chorus);
    });

    Tone.start();

    return () => {
      // Dispose logic if needed, though often fine to leave unless component unmounts
      // reverb.dispose(); delay.dispose(); chorus.dispose();
      // Since tracks are in state, we might not want to dispose them here?
      // Actually, if SynthProvider unmounts, we should clean up FX.
      reverb.dispose();
      delay.dispose();
      chorus.dispose();
    };
  }, []);

  // Sync Reverb State
  useEffect(() => {
    reverb.decay = state.reverb.decay;
    reverb.preDelay = state.reverb.preDelay;
    reverb.wet.value = state.reverb.mix;
  }, [state.reverb, reverb]);

  // Sync Delay State
  useEffect(() => {
    delay.delayTime.value = state.delay.delayTime;
    delay.feedback.value = state.delay.feedback;
    delay.wet.value = state.delay.mix;
  }, [state.delay, delay]);

  // Sync Chorus State
  useEffect(() => {
    chorus.frequency.value = state.chorus.frequency;
    chorus.depth = state.chorus.depth;
    chorus.wet.value = state.chorus.mix;
  }, [state.chorus, chorus]);


  const value = {
    ...state,
    dispatch,
  };

  return (
    <SynthContext.Provider value={value}>{children}</SynthContext.Provider>
  );
};

export default SynthProvider;

export const useSynth = () => {
  const context = useContext(SynthContext);
  if (context === undefined) {
    throw new Error("SynthProvider not found");
  }

  const selectedTrack = context.tracks[context.selectedTrackId];

  return {
    ...context,
    octave: selectedTrack.octave,
    synth: selectedTrack.synth,
    volume: selectedTrack.volume,
  };
};
