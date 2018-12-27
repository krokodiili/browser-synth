import React from 'react';
import styled from 'styled-components';

const Led = styled.div`
  width: 1em;
  height: 1em;
  background-color: ${({ lightsOn, value }) =>
    value >= lightsOn ? 'red' : 'gray'}
  border-radius: 100%;
`;

export default ({ value, onChange }) => (
  <div>
    <Led lightsOn={3} value={value} />
    <Led lightsOn={2} value={value} />
    <Led lightsOn={1} value={value} />

    <button onClick={() => onChange(value + 1)}> + </button>

    <button onClick={() => onChange(value - 1)}> - </button>
  </div>
);
