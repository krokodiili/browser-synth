import React, { PureComponent } from 'react';
import SynthView from '../components/Synth'

class Synth extends PureComponent {
    handleKeyPress = event => {
        const context = new AudioContext();
        const { osc, soundDuration } = this.props
        const o = context.createOscillator();
        const g = context.createGain();
        o.type = osc;

        let frequency = () => {
            switch (event.key) {
                case 'q':
                    return 261.6
                case '2':
                    return 277.2
                case 'w':
                    return 293.7
                case '3':
                    return 311.1
                case 'e':
                    return 329.6
                case 'r':
                    return 349.2
                case '5':
                    return 370.0
                case 't':
                    return 392.0
                case '6':
                    return 415.3
                case 'y':
                    return 440.0
                case '7':
                    return 466.2
                case 'u':
                    return 493.3
                case 'i':
                    return 523.3
                default:
                    return null
            }
        }

        o.frequency.value = frequency()
        o.connect(g);
        g.connect(context.destination);
        o.start(0);
        g.gain.exponentialRampToValueAtTime(
            0.00001, context.currentTime + soundDuration / 10
        );
    }

    render() {

        return (
            <div>
                <SynthView />
                <input type="text" onKeyPress={this.handleKeyPress} style={{marginLeft: 10}}/>
            </div>
        );
    }
}

export default Synth;
