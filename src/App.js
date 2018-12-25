import React, { Component } from 'react';
import OscSelector from './components/OscSelector'
import DurationSelector from './components/DurationSelector'
import Synth from './containers/Synth'

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
          <Synth osc={osc} soundDuration={soundDuration}/>
          <div style={{marginLeft: 10}}>
          <DurationSelector value={soundDuration} onChange={this.handleChange('soundDuration')}/>
          <OscSelector selected={osc} onChange={this.handleChange('osc')}/>
          </div>
      </div>
    );
  }
}

export default App;
