import React from "react";
import styled from "styled-components";
import { useSynth } from "../../state/synth";
import RubberButton from "../RubberButton";

const ClearButton = () => {
  const { dispatch } = useSynth();

  const handleClick = () =>
    dispatch({
      type: "CLEAR_LOOP",
    });

  return (
    <StyledRubberButton round onClick={handleClick}>
      CLEAR
    </StyledRubberButton>
  );
};

const StyledRubberButton = styled(RubberButton)`
  width: 50px;
  height: 50px;
  color: #fcfcfc;
`;

export default ClearButton;
