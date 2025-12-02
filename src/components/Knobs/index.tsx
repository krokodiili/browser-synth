import React, { useEffect } from "react";
import styled from "styled-components";
import { useSynth } from "../../state/synth";
import Knob from "./Knob";
import MagnetKnob from "./MagnetKnob";

const Knobs = () => {
  const { synth, volume, dispatch } = useSynth();

  //TODO: move this to util
  useEffect(() => {
    synth.volume.value = volume;
  }, [volume, synth.volume]);

  return (
    <RootWrapper>
      <Knob
        label="Volume"
        value={(volume + 60) / 60}
        onChange={(value) => {
          dispatch({
            type: "CHANGE_VOLUME",
            payload: (value * 60) - 60,
          });
        }}
      />
      <MagnetKnob />
    </RootWrapper>
  );
};

export default Knobs;

const RootWrapper = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;
  /* Removed fixed width and height to allow flexibility */
  padding: 10px;
  background: rgba(0,0,0,0.2);
  border-radius: 6px;
  border: 1px solid rgba(255,255,255,0.05);
`;
