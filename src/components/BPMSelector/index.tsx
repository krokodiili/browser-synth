import React from "react";
import { useLoop } from "../../state/loop";
import BPMSelectorView from "./view";

const BPMSelector: React.FC = () => {
  const { bpm, dispatch } = useLoop();

  const handleChange = (value: number) =>
    dispatch({
      type: "CHANGE_BPM",
      payload: value,
    });

  return <BPMSelectorView onChange={handleChange} value={bpm} />;
};

export default BPMSelector;
