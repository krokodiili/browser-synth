import React from 'react';
import styled from 'styled-components';

const RootWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Knob = styled.div`
  cursor: pointer;
  border: 3px solid #242424;
  width: 100px;
  border-radius: 100%;
  background-image: radial-gradient(50% 150%, #e6e6e6 50%, #000000 100%);
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  transform: ${({ degree }) => `rotate(${degree}deg)`};
`;

const Marker = styled.div`
  height: 20px;
  width: 5px;
  margin: 5px;
  background-color: #242424;
`;

export default ({ onDrag, degree }) => {
  return (
    <RootWrapper>
      <Knob degree={degree} onMouseDown={onDrag}>
        <Marker />
      </Knob>

      <p> Title </p>
    </RootWrapper>
  );
};
