import React from "react";
import styled from "styled-components";
import ClearButton from "./ClearButton";
import PlayButton from "./PlayButton";
import RecordButton from "./RecordButton";

const LoopingSection = () => {
  return (
    <RootWrapper>
      <RecordButton />
      <ClearButton />
      <PlayButton />
    </RootWrapper>
  );
};

const RootWrapper = styled.div`
  display: flex;

  button {
    margin: 0.5rem;
    width: 50px;
    height: 50px;
  }
`;

export default LoopingSection;
