import React from "react";
import styled from "styled-components";
import Screen from "../Screen";

const BPMSelectorView = ({ value, onChange }) => {
  return (
    <RootWrapper>
      <Screen>{value}</Screen>
      <ButtonWrapper>
        <button onClick={() => onChange(value + 1)}> + </button>
        <button onClick={() => onChange(value - 1)}> - </button>
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
`;

export default BPMSelectorView;
