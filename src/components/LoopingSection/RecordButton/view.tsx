import React from "react";
import styled from "styled-components";
import RubberButton from "../../RubberButton";

interface Props {
  recording: boolean;
  onClick: () => void;
}

const RecordButtonView: React.FC<Props> = ({ recording, onClick }) => {
  return (
    <StyledRubberButton onClick={onClick} round>
      {recording ? <PauseIcon /> : <RecordIcon />}
    </StyledRubberButton>
  );
};

export default RecordButtonView;

const StyledRubberButton = styled(RubberButton)`
  height: 50px;
  width: 50px;
`;

const RecordIcon = styled.div`
  width: 20px;
  height: 20px;
  background-color: red;
  border-radius: 100%;
`;

const PauseIcon = styled.div`
  width: 20px;
  height: 20px;
  background-color: gray;
`;
