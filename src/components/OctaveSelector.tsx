import React from "react";
import styled from "styled-components";
import { useSynth } from "../state/synth";
import RubberButton from "./RubberButton";

const OctaveSelector = () => {
  const { octave, dispatch } = useSynth();

  const handleUp = () => {
    if (octave < 5) {
      dispatch({ type: "OCTAVE_UP" });
    }
  };

  const handleDown = () => {
    if (octave > 2) {
      dispatch({ type: "OCTAVE_DOWN" });
    }
  };

  return (
    <RootWrapper>
      <Label>Octave</Label>
      <ControlRow>
        <OctaveButton onClick={handleDown}>-</OctaveButton>
        <Indicator>
          <Led $active={octave >= 5} />
          <Led $active={octave >= 4} />
          <Led $active={octave >= 3} />
          <Led $active={octave >= 2} />
        </Indicator>
        <OctaveButton onClick={handleUp}>+</OctaveButton>
      </ControlRow>
    </RootWrapper>
  );
};

export default OctaveSelector;

const RootWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  padding: 10px;
  background: rgba(0,0,0,0.2);
  border-radius: 6px;
  border: 1px solid rgba(255,255,255,0.05);
`;

const ControlRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Label = styled.div`
  font-size: 0.6rem;
  color: #aaa;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 1px;
`;

const OctaveButton = styled(RubberButton)`
  width: 30px;
  height: 30px;
  font-weight: bold;
  font-size: 1.2rem;
  padding: 0;
`;

const Indicator = styled.div`
  display: flex;
  flex-direction: column-reverse; /* Stack from bottom up (2 to 5) */
  gap: 4px;
  padding: 4px;
  background: #111;
  border-radius: 4px;
  box-shadow: inset 0 1px 3px rgba(0,0,0,0.8);
`;

const Led = styled.div<{ $active: boolean }>`
  width: 12px;
  height: 6px;
  background-color: ${({ $active }) => ($active ? "#00ff00" : "#223322")};
  box-shadow: ${({ $active }) => ($active ? "0 0 5px #00ff00" : "none")};
  border-radius: 1px;
`;
