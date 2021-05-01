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
    <div>
      <StyledRubberButton onClick={handleUp}> + </StyledRubberButton>

      <Led toggled={octave >= 5} />
      <Led toggled={octave >= 4} />
      <Led toggled={octave >= 3} />
      <Led toggled={octave >= 2} />

      <StyledRubberButton onClick={handleDown}>-</StyledRubberButton>
    </div>
  );
};

export default OctaveSelector;

const StyledRubberButton = styled(RubberButton)`
  color: white;
  width: 16px;
  margin: 0;
  box-shadow: none;
`;

const Led = styled.div<{ toggled?: boolean }>`
  width: 1em;
  height: 1em;
  box-shadow: ${({ toggled }) =>
    toggled
      ? "rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #441313 0 -1px 9px, rgba(255, 0, 0, 0.5) 0 2px 12px"
      : "none"};
  border: 1px solid #333;
  background-color: ${({ toggled }) => (toggled ? "red" : "gray")};
`;
