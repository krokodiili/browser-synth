import React from 'react';
import styled from 'styled-components';

const RootWrapper = styled.div`
  background-color: white;
  width: 4em;
  height: 14em;
  cursor: pointer;
  border: 1px solid black;
  color: black;
  z-index: 1;
  margin-left: ${({ noMargin }) => (noMargin ? '0' : '-1em')};
`;

export default ({ noMargin }) => <RootWrapper noMargin={noMargin} />;
