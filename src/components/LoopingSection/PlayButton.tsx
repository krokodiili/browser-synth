import React from "react";
import styled from "styled-components";
import { useSynth } from "../../state/synth";
import RubberButton from "../RubberButton";

const PlayButton = () => {
  const { playing, dispatch } = useSynth();

  const handleClick = () => {
    dispatch({
      type: playing ? "STOP_PLAYING" : "PLAY",
    });
  };

  return (
    <RubberButton onClick={handleClick} round>
      <Icon src={playing ? "pause.svg" : "play.svg"} />
    </RubberButton>
  );
};

const Icon = styled.img`
  width: 1.5rem;
`;

export default PlayButton;
