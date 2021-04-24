import * as Tone from "tone";

const useMetronome = () => {
  const mainSynth = new Tone.FMSynth().toDestination();
  const firstBeatSynth = new Tone.FMSynth().toDestination();

  const startMetronome = (bpm: number) => {
    Tone.Transport.bpm.value = bpm;

    new Tone.Loop((time) => {
      mainSynth.triggerAttackRelease("C4", "32n", time);
    }, "4n").start(0);

    new Tone.Loop((time) => {
      firstBeatSynth.triggerAttackRelease("C5", "16n", time);
    }, "1n").start(0);

    Tone.Transport.start();
  };

  const stopMetronome = () => {
    Tone.Transport.stop();
  };

  return {
    startMetronome,
    stopMetronome,
  };
};

export default useMetronome;
