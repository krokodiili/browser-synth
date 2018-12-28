import React from 'react';
import styled from 'styled-components';
//background-color: ${({ pressed }) => (pressed ? 'pink' : 'gray')};
const RootWrapper = styled.div`
  width: 2em;
  background: linear-gradient(
    180deg,
    rgba(58, 58, 59, 1) 0%,
    rgba(106, 106, 106, 1) 80%,
    rgba(40, 40, 40, 1) 100%
  );
  border: 1px solid black;
  height: 8em;
  z-index: 2;
  box-shadow: ${({ pressed }) => (pressed ? 'inset 0 0 10px #000000' : '')};
  margin: 0 0 0 -1em;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default ({ pressed, keyForNote }) => (
  <RootWrapper pressed={pressed}> {keyForNote} </RootWrapper>
);
