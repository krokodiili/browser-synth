import React from "react";
import SoundSelector from "../components/SoundSelector";

export default ({ selected, onChange }) => {
  const sounds = ["sine", "square", "sawtooth", "triangle"];
  const selectedIndex = sounds.indexOf(selected);
  const handleNextSound = () => {
    if (selectedIndex + 1 !== sounds.length) {
      onChange(sounds[selectedIndex + 1]);
    }
  };

  const handlePreviousSound = () => {
    if (selectedIndex > 0) {
      onChange(sounds[selectedIndex - 1]);
    }
  };

  return (
    <SoundSelector
      onNextSound={handleNextSound}
      onPreviousSound={handlePreviousSound}
      soundIndex={selectedIndex}
      sounds={sounds}
    />
  );
};
