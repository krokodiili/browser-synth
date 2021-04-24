import React from "react";
import RecordButtonView from "./view";
import { useSynth } from "../../state/synth";

const RecordButton: React.FC = () => {
  const { recording, dispatch } = useSynth();

  const handleClick = () => {
    dispatch({
      type: recording ? "STOP_RECORDING" : "START_RECORDING",
    });
  };

  return <RecordButtonView recording={recording} onClick={handleClick} />;
};

export default RecordButton;
