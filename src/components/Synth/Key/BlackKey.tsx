import React from "react";
import styled from "styled-components";
import { KeyProps } from "./types";

const BlackKey: React.FC<KeyProps> = ({ pressed, keyForNote }) => (
  <RootWrapper $pressed={pressed}> {keyForNote} </RootWrapper>
);

export default BlackKey;

const RootWrapper = styled.div<{ $pressed?: boolean }>`
  width: 2.5em;
  height: 14em;

  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: initial;
  z-index: 1;
  margin-left: -1.5em;
  background-image: linear-gradient(
    -180deg,
    #000000 0%,
    #323232 87%,
    #818181 99%
  );
  box-shadow: ${({ $pressed }) => ($pressed ? "inset 0 0 2em #777" : "")};
  border: 3px solid #000000;
`;
