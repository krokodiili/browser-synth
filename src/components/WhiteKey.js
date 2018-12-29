import React from 'react';
import styled from 'styled-components';

const RootWrapper = styled.div`
  width: 6em;
  height: 24em;
  cursor: pointer;
  box-shadow: ${({ pressed }) => (pressed ? 'inset 0 0 20px #888' : '')};
  color: black;
  z-index: 1;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 1em;
  margin-left: ${({ noMargin }) => (noMargin ? '0' : '-1.5em')};
  background: #f1f1f1;
  border: 1px solid #979797;
  color: rgba(0, 0, 0, 0.87);
  border-radius: 0 0 8px 8px;
`;

export default ({ noMargin, pressed, keyForNote }) => (
  <RootWrapper noMargin={noMargin} pressed={pressed}>
    {keyForNote}
  </RootWrapper>
);
