import React from "react";
import styled from "styled-components";
import { useSynth } from "../state/synth";

const OctaveSelector = () => {
  const { octave, dispatch } = useSynth();

  return (
    <div>
      <Led toggled={octave >= 3} />
      <Led toggled={octave >= 2} />
      <Led toggled={octave >= 1} />

      <button onClick={() => dispatch({ type: "OCTAVE_UP" })}> + </button>

      <button onClick={() => dispatch({ type: "OCTAVE_DOWN" })}> - </button>
    </div>
  );
};

export default OctaveSelector;

const Led = styled.div<{ toggled?: boolean }>`
  width: 1em;
  height: 1em;
  background-color: ${({ toggled }) => (toggled ? "red" : "gray")};
  border-radius: 100%;
`;
