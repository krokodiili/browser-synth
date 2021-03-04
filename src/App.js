import React, { Component } from "react";
import SoundSelector from "./containers/SoundSelector";
import DurationSelector from "./components/DurationSelector";
import Synth from "./components/Synth";
import OctaveSelector from "./components/OctaveSelector";
import Knob from "./components/Knob";
import GlobalStyle from "./globalStyles";

class App extends Component {
  state = {
    soundType: "square",
    octave: 2,
    volume: 0.5,
    attack: 1,
  };

  handleOctaveChange = (value) => {
    if (value > 0 && value < 4) {
      this.setState({ ...this.state, octave: value });
    }
  };

  handleChange = (target) => (value) => {
    console.log(target, value);
    this.setState({ [target]: value });
  };

  render() {
    const { soundType, octave } = this.state;

    console.log(this.state.volume);
    return (
      <div>
        <GlobalStyle />
        <Synth {...this.state}>
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
          <OctaveSelector onChange={this.handleOctaveChange} value={octave} />
        </Synth>
      </div>
    );
  }
}

export default App;
