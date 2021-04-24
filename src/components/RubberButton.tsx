import React from "react";
import styled from "styled-components";

interface Props {
  onClick: () => void;
}

const RubberButton: React.FC<Props> = ({ onClick, ...props }) => (
  <StyledButton onClick={onClick} {...props}></StyledButton>
);

export default RubberButton;

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
