import React from "react";
import RecordButtonView from "./view";
import { useLoop } from "../loopState";

const RecordButton: React.FC = () => {
  const { recording, dispatch } = useLoop();

  const handleClick = async () => {
    await Tone.start();
    dispatch({
      type: recording ? "STOP_RECORDING" : "START_RECORDING",
    });
  };

  return <RecordButtonView recording={recording} onClick={handleClick} />;
};

export default RecordButton;
