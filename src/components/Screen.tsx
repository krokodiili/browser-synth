import React from "react";
import styled from "styled-components";

const Screen: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  return (
    <Bezel>
      <Glass>
        <RootWrapper {...props} />
      </Glass>
    </Bezel>
  );
};

export default Screen;

const Bezel = styled.div`
  background: #111;
  padding: 4px;
  border-radius: 4px;
  box-shadow:
    0 1px 0 rgba(255,255,255,0.1),
    inset 0 1px 1px rgba(0,0,0,0.8);
  display: inline-block;
`;

const Glass = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 2px;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%);
    pointer-events: none;
  }
`;

const RootWrapper = styled.div`
  background-color: #2b3a28; /* Darker off state */
  color: #4bd83a; /* Bright green text */
  font-family: 'arcade', 'Courier New', monospace;
  font-size: 1.2rem;
  padding: 8px 12px;
  min-width: 100px;
  text-align: center;
  text-shadow: 0 0 2px rgba(75, 216, 58, 0.7);
  box-shadow: inset 0 0 10px rgba(0,0,0,0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 2px;
`;
