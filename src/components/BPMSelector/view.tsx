import React from "react";
import styled from "styled-components";
import RubberButton from "../RubberButton";
import Screen from "../Screen";

interface Props {
  value: number;
  onChange: (value: number) => void;
}

const BPMSelectorView: React.FC<Props> = ({ value, onChange }) => {
  return (
    <RootWrapper>
      <Screen>{value}</Screen>
      <ButtonWrapper>
        <StyledButton onClick={() => onChange(value + 1)}> + </StyledButton>
        <StyledButton onClick={() => onChange(value - 1)}> - </StyledButton>
      </ButtonWrapper>
    </RootWrapper>
  );
};

const RootWrapper = styled.div`
  display: flex;
  height: 50px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const StyledButton = styled(RubberButton)`
  font-weight: bolder;
  font-size: 1rem;
  color: pink;
  width: 1.5rem;
  height: 100%;
`;

export default BPMSelectorView;
