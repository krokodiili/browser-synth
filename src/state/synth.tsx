import { createContext, useContext, useReducer } from "react";
import * as Tone from "tone";
import { PolySynth } from "tone";

type Dispatch = (action: Action) => void;

export interface SynthState {
  octave: number;
  synth: PolySynth;

  dispatch: Dispatch;
}

export type Action = { type: "OCTAVE_UP" } | { type: "OCTAVE_DOWN" };

const initialState: SynthState = {
  octave: 4,
  synth: new Tone.PolySynth().toDestination(),
  dispatch: () => {},
};

const synthReducer = (state: SynthState, action) => {
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
