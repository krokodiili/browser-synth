import React from 'react';
import styled from 'styled-components';
//background-color: ${({ pressed }) => (pressed ? 'pink' : 'gray')};
const RootWrapper = styled.div`
  width: 2.5em;
  height: 14em;

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 1;
  margin-left: -1.5em;
  background-image: linear-gradient(
    -180deg,
    #000000 0%,
    #323232 87%,
    #818181 99%
  );
  box-shadow: ${({ pressed }) => (pressed ? 'inset 0 0 2em #777' : '')};
  border: 3px solid #000000;
`;

export default ({ pressed, keyForNote }) => (
  <RootWrapper pressed={pressed}> {keyForNote} </RootWrapper>
);
