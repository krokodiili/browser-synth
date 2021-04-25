import React from "react";
import SoundSelector from "./components/SoundSelector";
import Synth from "./components/Synth";
import OctaveSelector from "./components/OctaveSelector";
import GlobalStyle from "./globalStyles";
import SynthProvider from "./state/synth";
import Knobs from "./components/Knobs";
import BPMSelector from "./components/BPMSelector";
import DebugPanel from "./components/DebugPanel";
import LoopingSection from "./components/LoopingSection";

const App: React.FC = () => {
  return (
    <SynthProvider>
      <GlobalStyle />
      <Synth>
        <BPMSelector />
        <LoopingSection />
        <SoundSelector />
        <Knobs />
        <OctaveSelector />
      </Synth>

      <DebugPanel />
    </SynthProvider>
  );
};

export default App;
