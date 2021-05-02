import { createContext, useContext, useEffect, useReducer } from "react";
import * as Tone from "tone";
import { PolySynth, Reverb } from "tone";
import { Time } from "tone/build/esm/core/type/Units";
import useMetronome from "../hooks/useMetronome";

Tone.context.lookAhead = 0;

type Dispatch = (action: Action) => void;

export interface SynthState {
  octave: number;
  playing: boolean;
  notesRecorded: RecordedNote[];
  recording: boolean;
  synth: PolySynth;
  bpm: number;
  volume: number;
  dispatch: Dispatch;
}

export interface RecordedNote {
  note: string;
  time: Time;
  length: number;
}

export type Action =
  | { type: "OCTAVE_UP" }
  | { type: "OCTAVE_DOWN" }
  | { type: "CHANGE_BPM"; payload: number }
  | { type: "CHANGE_VOLUME"; payload: number }
  | { type: "START_RECORDING" }
  | { type: "STOP_RECORDING" }
  | { type: "PLAY" }
  | { type: "STOP_PLAYING" }
  | {
      type: "RECORD_NOTE";
      payload: RecordedNote;
    }
  | {
      type: "CLEAR_LOOP";
    };

const initialState: SynthState = {
  octave: 4,
  bpm: 128,
  synth: new Tone.PolySynth().toDestination(),
  notesRecorded: [],
  dispatch: () => {},
  volume: 0,
  recording: false,
  playing: false,
};

const synthReducer = (state: SynthState, action: Action) => {
  switch (action.type) {
    case "OCTAVE_UP":
      return {
        ...state,
        octave: state.octave + 1,
      };
    case "OCTAVE_DOWN":
      return {
        ...state,
        octave: state.octave - 1,
      };
    case "CHANGE_VOLUME":
      return {
        ...state,
        volume: action.payload,
      };
    case "CHANGE_BPM":
      return {
        ...state,
        bpm: action.payload,
      };
    case "START_RECORDING":
      return {
        ...state,
        recording: true,
        playing: true,
      };
    case "STOP_RECORDING":
      return {
        ...state,
        recording: false,
      };
    case "RECORD_NOTE":
      return {
        ...state,
        notesRecorded: [...state.notesRecorded, action.payload],
      };
    case "CLEAR_LOOP":
      return {
        ...state,
        notesRecorded: [],
      };
    case "PLAY":
      return {
        ...state,
        playing: true,
      };
    case "STOP_PLAYING":
      return {
        ...state,
        playing: false,
      };
    default:
      return state;
  }
};
const SynthContext = createContext<SynthState>(initialState);

const SynthProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(synthReducer, initialState);
  const { stopMetronome, startMetronome } = useMetronome();

  useEffect(() => {
    if (state.playing) {
      stopMetronome();
      startMetronome(state.bpm);
    } else {
      stopMetronome();
    }
  }, [state.playing, state.bpm, stopMetronome, startMetronome]);

  const value = {
    ...state,
    dispatch,
  };

  useEffect(() => {
    const reverb = new Reverb(4).toDestination();
    state.synth.set({
      oscillator: {
        type: "sine",
      },
    });
    state.synth.connect(reverb);
  }, [state.synth]);

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

  return context;
};
