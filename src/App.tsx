import React, { Component } from "react";
import SoundSelector from "./components/SoundSelector";
import DurationSelector from "./components/DurationSelector";
import Synth from "./components/Synth";
import OctaveSelector from "./components/OctaveSelector";
import Knob from "./components/Knob";
import GlobalStyle from "./globalStyles";
import SynthProvider from "./state/synth";

const App: React.FC = () => {
  return (
    <SynthProvider>
      <GlobalStyle />
      <Synth></Synth>
    </SynthProvider>
  );
};

export default App;
/*
  <SoundSelector

          selected={soundType}
          onChange={this.handleChange("soundType")}
        />
        <Knob
          label="Volume"
          value={this.state.volume}
          onChange={(value) => {
            this.setState({
              ...this.state,
              volume: value,
            });
          }}
        />
        <Knob />
        <Knob />
        <Knob />
        <OctaveSelector />
*/
