import { createContext, useContext, useEffect, useReducer } from "react";
import * as Tone from "tone";
import { PolySynth, Reverb } from "tone";

Tone.context.lookAhead = 0;

type Dispatch = (action: Action) => void;

export interface SynthState {
  octave: number;
  synth: PolySynth;
  volume: number;
  dispatch: Dispatch;
}

export type Action =
  | { type: "OCTAVE_UP" }
  | { type: "OCTAVE_DOWN" }
  | { type: "CHANGE_VOLUME"; payload: number };

const initialState: SynthState = {
  octave: 4,
  synth: new Tone.PolySynth().toDestination(),
  dispatch: () => {},
  volume: 0,
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
    default:
      return state;
  }
};
const SynthContext = createContext<SynthState>(initialState);

const SynthProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(synthReducer, initialState);

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
