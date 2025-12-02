import * as Tone from "tone";

const clickSynth = new Tone.MembraneSynth({
  pitchDecay: 0.008,
  octaves: 2,
  envelope: {
    attack: 0.001,
    decay: 0.2,
    sustain: 0,
    release: 0.1, // Quick release
  }
}).toDestination();
// Lower volume slightly so it's not piercing
clickSynth.volume.value = -10;

const mainLoop = new Tone.Loop((time) => {
  // Weak beat
  clickSynth.triggerAttackRelease("C5", "32n", time);
}, "4n");

const firstBeatLoop = new Tone.Loop((time) => {
  // Strong beat (Accent)
  clickSynth.triggerAttackRelease("G5", "32n", time);
}, "1n");

const startMetronome = (bpm: number) => {
  Tone.Transport.bpm.value = bpm;
  Tone.Transport.start();
  mainLoop.start();
  firstBeatLoop.start();

  Tone.Transport.loop = true;
  Tone.Transport.loopStart = "0:0:0";
  Tone.Transport.loopEnd = "4:0:0";
  console.log("start", Tone.Transport.loop);
};

const stopMetronome = () => {
  mainLoop.stop();
  firstBeatLoop.stop();
  Tone.Transport.stop();
};

const useMetronome = () => {
  return {
    startMetronome,
    stopMetronome,
  };
};

export default useMetronome;
