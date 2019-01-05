import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background: #363636;
  border: 1px solid #222222;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  border-radius: 1px;
  width: 3em;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Triangle = styled.div`
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-right: 10px solid #272727;
  transform: ${({ flipped }) => (flipped ? 'rotate(180deg)' : '')};
`;

export default ({ className, onClick, flipped }) => (
  <StyledButton onClick={onClick}>
    <Triangle flipped={flipped} />
  </StyledButton>
);
