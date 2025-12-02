import React from "react";
import SoundSelector from "./components/SoundSelector";
import Synth from "./components/Synth";
import OctaveSelector from "./components/OctaveSelector";
import GlobalStyle from "./globalStyles";
import SynthProvider from "./state/synth";
import Knobs from "./components/Knobs";
import BPMSelector from "./components/BPMSelector";
import LoopingSection from "./components/LoopingSection";
import LoopProvider from "./state/loop";
import { DrumMachineProvider } from "./state/drumMachine";
import DrumMachine from "./components/DrumMachine/DrumMachine";

const App: React.FC = () => {
  return (
    <SynthProvider>
      <LoopProvider>
        <DrumMachineProvider>
          <GlobalStyle />
          <Synth>
            <BPMSelector />
            <LoopingSection />
            <DrumMachine />
            <SoundSelector />
            <Knobs />
            <OctaveSelector />
          </Synth>
        </DrumMachineProvider>
      </LoopProvider>
    </SynthProvider>
  );
};

export default App;
