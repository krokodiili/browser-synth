import React from "react";
import styled from "styled-components";

interface Props {
  onClick: () => void;
  $round?: boolean;
}

const RubberButton: React.FC<Props> = ({ onClick, ...props }) => (
  <StyledButton onClick={onClick} {...props}></StyledButton>
);

export default RubberButton;

const StyledButton = styled.button<Props>`
  background: #363636;
  border: 1px solid #222222;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  border-radius: ${({ $round }) => ($round ? "100%" : "1px")};
  display: flex;
  justify-content: center;
  align-items: center;
`;
