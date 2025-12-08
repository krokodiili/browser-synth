import React from "react";
import SoundSelector from "./components/Synth/SoundSelector";
import Synth from "./components/Synth";
import OctaveSelector from "./components/Synth/OctaveSelector";
import GlobalStyle from "./globalStyles";
import SynthProvider from "./components/Synth/synthState";
import Knobs from "./components/Synth/Knobs";
import BPMSelector from "./components/BPMSelector";
import LoopingSection from "./components/LoopingSection";
import LoopProvider from "./components/LoopingSection/loopState";
import { DrumMachineProvider } from "./components/DrumMachine/drumMachineState";
import DrumMachine from "./components/DrumMachine/DrumMachine";
import MasterBoard from "./components/MasterBoard/MasterBoard";
import SongManager from "./components/SongManager/SongManager";
import styled from "styled-components";

const App: React.FC = () => {
  return (
    <SynthProvider>
      <LoopProvider>
        <DrumMachineProvider>
          <GlobalStyle />
          <TopSection>
            <SongManager />
            <DrumMachine />
            <MasterBoard />
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
