import React, { Component } from 'react';
import './App.css';
import OscSelector from './components/OscSelector'
import DurationSelector from './components/DurationSelector'
import Synth from './containers/Synth'
const context = new AudioContext();

class App extends Component {
  state = {
    osc: 'sine',
    soundDuration: '1'
  }

  handleChange = target => value => {
    this.setState({[target]: value})
  }

  render() {
    const {osc, soundDuration} = this.state

    return (
      <div className="App">
        <header className="App-header">
          <Synth osc={osc} soundDuration={soundDuration}/>
          <DurationSelector value={soundDuration} onChange={this.handleChange('soundDuration')}/>
          <OscSelector selected={osc} onChange={this.handleChange('osc')}/>
        </header>
      </div>
    );
  }
}

export default App;
