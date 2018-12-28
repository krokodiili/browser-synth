import React from 'react';
import styled from 'styled-components';

const RootWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Outside = styled.div`
  width: 100px;
  height: 100px;
  background-color: #111;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Inside = styled.div`
  width: 70px;
  height: 70px;
  background: #222;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  transform: ${({ degree }) => `rotate(${degree}deg)`};
`;

const Marker = styled.div`
  height: 20px;
  width: 2px;
  background-color: #ff0000;
`;

export default ({ onDrag, degree }) => {
  return (
    <RootWrapper onMouseDown={onDrag}>
      <Outside>
        <Inside degree={degree}>
          <Marker />
        </Inside>
      </Outside>
      <p> Title </p>
    </RootWrapper>
  );
};
