import React, { useEffect } from "react";
import styled from "styled-components";
import { useSynth } from "../../state/synth";
import Knob from "./Knob";

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
        value={volume}
        onChange={(value) => {
          dispatch({
            type: "CHANGE_VOLUME",
            payload: (value - 0.5) * 20,
          });
        }}
      />
    </RootWrapper>
  );
};

export default Knobs;

const RootWrapper = styled.div`
  background-color: gray;
  border-radius: 4px;
  width: 200px;
  display: flex;
  justify-content: center;
  height: 50px;
`;
