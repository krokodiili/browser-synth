import React from "react";
import SoundSelector from "./components/SoundSelector";
import Synth from "./components/Synth";
import OctaveSelector from "./components/OctaveSelector";
import GlobalStyle from "./globalStyles";
import SynthProvider from "./state/synth";
import Knobs from "./components/Knobs";

const App: React.FC = () => {
  return (
    <SynthProvider>
      <GlobalStyle />
      <Synth>
        <SoundSelector />
        <Knobs />
        <OctaveSelector />
      </Synth>
    </SynthProvider>
  );
};

export default App;
