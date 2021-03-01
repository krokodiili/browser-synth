import React, { Component } from "react";
import SoundSelector from "./containers/SoundSelector";
import DurationSelector from "./components/DurationSelector";
import Synth from "./components/Synth";
import OctaveSelector from "./components/OctaveSelector";
import Knob from "./components/Knob";
import GlobalStyle from "./globalStyles";

class App extends Component {
  state = {
    selectedSound: "square",
    selectedOctave: 2,
    volume: 0.5,
  };

  handleOctaveChange = (value) => {
    if (value > 0 && value < 4) {
      this.setState({ selectedOctave: value });
    }
  };

  handleChange = (target) => (value) => {
    this.setState({ [target]: value });
  };

  render() {
    const { selectedSound, selectedOctave } = this.state;

    console.log(this.state.volume);
    return (
      <div>
        <GlobalStyle />
        <Synth {...this.state}>
          <SoundSelector
            selected={selectedSound}
            onChange={this.handleChange("selectedSound")}
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
          <OctaveSelector
            onChange={this.handleOctaveChange}
            value={selectedOctave}
          />
        </Synth>
      </div>
    );
  }
}

export default App;
