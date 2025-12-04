import React, { useEffect } from "react";
import styled from "styled-components";
import * as Tone from "tone";
import RubberButton from "../RubberButton";
import { useSynth } from "../Synth/synthState";
import { RecordedNote, useLoop } from "./loopState";

const PlayButton = () => {
  const { tracks } = useSynth();
  const { playing, notesRecorded, dispatch } = useLoop();

  useEffect(() => {
    const part = new Tone.Part((time: any, value: RecordedNote) => {
      // Find the correct synth based on trackId. Fallback to track 0 if trackId is undefined (legacy notes).
      const trackId = value.trackId !== undefined ? value.trackId : 0;
      const track = tracks.find(t => t.id === trackId);

      if (track) {
        track.synth.triggerAttackRelease(value.note, value.length, time);
      }
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
