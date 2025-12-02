import { createContext, useContext, useEffect, useReducer } from "react";
import * as Tone from "tone";
import { PolySynth, Reverb } from "tone";

Tone.context.lookAhead = 0;

type Dispatch = (action: Action) => void;

export interface Track {
  id: number;
  octave: number;
  synth: PolySynth;
  volume: number;
}

export interface SynthState {
  tracks: Track[];
  selectedTrackId: number;
  dispatch: Dispatch;
}

export type Action =
  | { type: "OCTAVE_UP" }
  | { type: "OCTAVE_DOWN" }
  | { type: "CHANGE_VOLUME"; payload: number }
  | { type: "SELECT_TRACK"; payload: number };

const createTrack = (id: number): Track => ({
  id,
  octave: 4,
  synth: new Tone.PolySynth().toDestination(),
  volume: 0,
});

const initialState: SynthState = {
  tracks: [createTrack(0), createTrack(1), createTrack(2), createTrack(3)],
  selectedTrackId: 0,
  dispatch: () => {},
};

const synthReducer = (state: SynthState, action: Action) => {
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
    default:
      return state;
  }
};
const SynthContext = createContext<SynthState>(initialState);

const SynthProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(synthReducer, initialState);

  // Expose the current track's properties + dispatch + tracks list
  const value = {
    ...state,
    dispatch,
  };

  useEffect(() => {
    const reverb = new Reverb().toDestination();
    reverb.decay = 4;

    // Connect all synths to reverb
    // We use the synths from the state available on mount (initialState)
    // Since synth instances are stable, this connection persists.
    state.tracks.forEach((track) => {
      track.synth.set({
        oscillator: {
          type: "sine",
        },
      });
      track.synth.connect(reverb);
    });

    Tone.start();

    return () => {
      reverb.dispose();
    };
  }, []);

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
    // For backward compatibility and ease of use in components that act on the active track
    octave: selectedTrack.octave,
    synth: selectedTrack.synth,
    volume: selectedTrack.volume,
  };
};
