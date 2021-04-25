import React from "react";
import styled from "styled-components";
import ClearButton from "./ClearButton";
import RecordButton from "./RecordButton";

const LoopingSection = () => {
  return (
    <RootWrapper>
      <RecordButton />
      <ClearButton />
    </RootWrapper>
  );
};

const RootWrapper = styled.div`
  display: flex;

  button {
    margin: 0.5rem;
  }
`;

export default LoopingSection;
