import React, { useEffect } from "react";
import styled from "styled-components";
import { useSynth } from "../../state/synth";
import RubberButton from "../RubberButton";
import * as Tone from "tone";
import { RecordedNote, useLoop } from "../../state/loop";

const PlayButton = () => {
  const { synth } = useSynth();
  const { playing, notesRecorded, dispatch } = useLoop();

  useEffect(() => {
    const part = new Tone.Part((time: any, value: RecordedNote) => {
      synth.triggerAttackRelease(value.note, value.length, time);
    }, notesRecorded).start();
    return () => {
      part.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing]);

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
