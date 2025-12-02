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
import MasterBoard from "./components/MasterBoard/MasterBoard";
import styled from "styled-components";

const App: React.FC = () => {
  return (
    <SynthProvider>
      <LoopProvider>
        <DrumMachineProvider>
          <GlobalStyle />
          <TopSection>
            <MasterBoard />
            <DrumMachine />
          </TopSection>
          <Synth>
            <BPMSelector />
            <LoopingSection />
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

const TopSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
  width: 100%;
  max-width: 98vw;
`;
