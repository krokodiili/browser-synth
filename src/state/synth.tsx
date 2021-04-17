import { createContext, useContext } from "react";
import * as Tone from "tone";
import { PolySynth } from "tone";

export interface SynthState {
  octave: number;
  synth: PolySynth;
}

const initialState: SynthState = {
  octave: 4,
  synth: new Tone.PolySynth().toDestination(),
};

const SynthContext = createContext<SynthState>(initialState);

const SynthProvider: React.FC = ({ children }) => {
  return (
    <SynthContext.Provider value={initialState}>
      {children}
    </SynthContext.Provider>
  );
};

export default SynthProvider;

export const useSynth = () => useContext(SynthContext);
