import React from "react";
import SelectorView from "./SelectorView";

interface Props {
  selected: any;
  onChange: any;
}

const SoundSelector: React.FC<Props> = ({ selected, onChange }) => {
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
    <SelectorView
      onNextSound={handleNextSound}
      onPreviousSound={handlePreviousSound}
      soundIndex={selectedIndex}
      sounds={sounds}
    />
  );
};

export default SoundSelector;
