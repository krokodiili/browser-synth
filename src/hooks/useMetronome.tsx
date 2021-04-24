import * as Tone from "tone";

const mainSynth = new Tone.FMSynth().toDestination();
const firstBeatSynth = new Tone.FMSynth().toDestination();
const player = new Tone.Player(
  "https://tonejs.github.io/audio/drum-samples/CR78/hihat.mp3"
).toDestination();
const player2 = new Tone.Player(
  "https://tonejs.github.io/audio/drum-samples/CR78/kick.mp3"
).toDestination();

const mainLoop = new Tone.Loop((time) => {
  player.start(0);
}, "4n");

const firstBeatLoop = new Tone.Loop((time) => {
  player2.start(0);
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
