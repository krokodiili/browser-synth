import React, { useState } from "react";
import { useSynth } from "../../state/synth";
import SelectorView from "./SelectorView";

const SoundSelector: React.FC = () => {
  const sounds: OscillatorType[] = ["sine", "square", "sawtooth", "triangle"];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { synth } = useSynth();

  const onChange = (index: number) => {
    setSelectedIndex(index);

    synth.set({
      oscillator: {
        type: sounds[index],
      },
    });
  };

  const handleNextSound = () => {
    if (selectedIndex + 1 !== sounds.length) {
      onChange(selectedIndex + 1);
    }
  };

  const handlePreviousSound = () => {
    if (selectedIndex > 0) {
      onChange(selectedIndex - 1);
    }
  };

  return (
    <SelectorView
      onNextSound={handleNextSound}
      onPreviousSound={handlePreviousSound}
      soundIndex={selectedIndex}
      sounds={sounds}
    />
  );
};

export default SoundSelector;
