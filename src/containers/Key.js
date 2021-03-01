import React, { Component } from "react";
import BlackKey from "../components/BlackKey";
import WhiteKey from "../components/WhiteKey";
import Pizzicato from "pizzicato";

class Synth extends Component {
  state = {
    playing: false,
  };

  reverb = new Pizzicato.Effects.Reverb({
    time: 1,
    decay: 0.8,
    reverse: true,
    mix: 0.5,
  });
  sound = new Pizzicato.Sound({
    source: "wave",

    options: this.props.soundSettings,
  });

  //TODO: Setup proper update
  componentDidUpdate = (prevProps) => {
    const { frequency, soundType } = this.props;
    if (frequency !== prevProps.frequency) {
      this.sound.stop();
      this.sound = new Pizzicato.Sound({
        source: "wave",
        options: { ...this.props.soundSettings, frequency: frequency },
      });
    }
    if (soundType !== prevProps.soundType) {
      this.sound = new Pizzicato.Sound({
        source: "wave",

        options: {
          ...this.props.soundSettings,
          frequency: this.props.frequency,
        },
      });
    }
  };

  componentDidMount = () => {
    const { keyForNote } = this.props;
    this.sound.addEffect(this.reverb);
    document.body.addEventListener("keydown", (event) => {
      if (event.key === keyForNote) {
        this.playNote();
      }
    });

    document.body.addEventListener("keyup", (event) => {
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

    if (variant === "white") {
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
