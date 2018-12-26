import React, { Component } from 'react';
import BlackKey from '../components/BlackKey';
import WhiteKey from '../components/WhiteKey';
import Pizzicato from 'pizzicato';

class Synth extends Component {
  state = {
    playing: false
  };

  sound = new Pizzicato.Sound({
    source: 'wave',
    options: { type: this.props.soundType, frequency: this.props.frequency }
  });

  componentDidMount = () => {
    const { keyForNote } = this.props;
    document.body.addEventListener('keydown', event => {
      if (event.key === keyForNote) {
        this.playNote();
      }
    });

    document.body.addEventListener('keyup', event => {
      if (event.key === keyForNote) {
        this.stopNote();
      }
    });
  };

  stopNote = () => {
    this.sound.stop();
    this.setState({ playing: false });
  };

  playNote = () => {
    this.sound.play();
    this.setState({ playing: true });
  };

  render() {
    const { playing } = this.state;
    const { variant, noMargin, keyForNote } = this.props;
    if (variant === 'white') {
      return (
        <WhiteKey
          pressed={playing}
          noMargin={noMargin}
          keyForNote={keyForNote}
        />
      );
    }
    return <BlackKey pressed={playing} keyForNote={keyForNote} />;
  }
}

export default Synth;
