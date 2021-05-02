import React from "react";
import { useSynth } from "../../state/synth";
import BPMSelectorView from "./view";

const BPMSelector: React.FC = () => {
  const { bpm, dispatch } = useSynth();

  const handleChange = (value: number) =>
    dispatch({
      type: "CHANGE_BPM",
      payload: value,
    });

  return <BPMSelectorView onChange={handleChange} value={bpm} />;
};

export default BPMSelector;
