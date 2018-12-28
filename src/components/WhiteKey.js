import React from 'react';
import styled from 'styled-components';

const RootWrapper = styled.div`
  background-color: #f1f1f1;
  width: 4em;
  height: 14em;
  cursor: pointer;
  border: 1px solid black;
  box-shadow: ${({ pressed }) => (pressed ? 'inset 0 0 10px #000000' : '')};
  color: black;
  z-index: 1;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 10px;
  margin-left: ${({ noMargin }) => (noMargin ? '0' : '-1em')};
`;

export default ({ noMargin, pressed, keyForNote }) => (
  <RootWrapper noMargin={noMargin} pressed={pressed}>
    {keyForNote}
  </RootWrapper>
);
