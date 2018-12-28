import React, { Component } from 'react';
import OscSelector from './components/OscSelector';
import DurationSelector from './components/DurationSelector';
import Synth from './containers/Synth';
import OctaveSelector from './components/OctaveSelector';
import Knob from './containers/Knob';

class App extends Component {
  state = {
    osc: 'sine',
    soundDuration: '1',
    selectedOctave: 2
  };

  handleOctaveChange = value => {
    if (value > 0 && value < 4) {
      this.setState({ selectedOctave: value });
    }
  };

  handleChange = target => value => {
    this.setState({ [target]: value });
  };

  render() {
    const { osc, soundDuration, selectedOctave } = this.state;

    return (
      <div>
        <Synth
          osc={osc}
          soundDuration={soundDuration}
          selectedOctave={selectedOctave}
        />
        <div style={{ marginLeft: 10 }}>
          <DurationSelector
            value={soundDuration}
            onChange={this.handleChange('soundDuration')}
          />
          <OscSelector selected={osc} onChange={this.handleChange('osc')} />
          <OctaveSelector
            onChange={this.handleOctaveChange}
            value={selectedOctave}
          />
          <Knob />
        </div>
      </div>
    );
  }
}

export default App;
