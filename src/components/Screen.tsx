import React from "react";
import styled from "styled-components";

const Screen: React.FC = (props) => {
  return <RootWrapper {...props} />;
};

export default Screen;

const RootWrapper = styled.div`
  background-color: #1f7307;
  font-family: arcade, sans-serif;
  font-size: 1.5rem;
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
`;
