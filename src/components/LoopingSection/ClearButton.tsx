import React from "react";
import styled from "styled-components";
import { useLoop } from "../../state/loop";
import RubberButton from "../RubberButton";

const ClearButton = () => {
  const { dispatch } = useLoop();

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
