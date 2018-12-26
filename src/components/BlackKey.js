import React from 'react';
import styled from 'styled-components';

const RootWrapper = styled.div`
  width: 2em;
  background-color: ${({ pressed }) => (pressed ? 'pink' : 'gray')};
  height: 8em;
  z-index: 2;
  margin: 0 0 0 -1em;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default ({ pressed, keyForNote }) => (
  <RootWrapper pressed={pressed}> {keyForNote} </RootWrapper>
);
