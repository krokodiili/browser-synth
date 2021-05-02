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

const App: React.FC = () => {
  return (
    <SynthProvider>
      <LoopProvider>
        <GlobalStyle />
        <Synth>
          <BPMSelector />
          <LoopingSection />
          <SoundSelector />
          <Knobs />
          <OctaveSelector />
        </Synth>
      </LoopProvider>
    </SynthProvider>
  );
};

export default App;
