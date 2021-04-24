import React from "react";
import SoundSelector from "./components/SoundSelector";
import Synth from "./components/Synth";
import OctaveSelector from "./components/OctaveSelector";
import GlobalStyle from "./globalStyles";
import SynthProvider from "./state/synth";
import Knobs from "./components/Knobs";
import BPMSelector from "./components/BPMSelector";
import RecordButton from "./components/RecordButton";
import DebugPanel from "./components/DebugPanel";

const App: React.FC = () => {
  return (
    <SynthProvider>
      <GlobalStyle />
      <Synth>
        <BPMSelector />
        <RecordButton />
        <SoundSelector />
        <Knobs />
        <OctaveSelector />
      </Synth>

      <DebugPanel />
    </SynthProvider>
  );
};

export default App;
