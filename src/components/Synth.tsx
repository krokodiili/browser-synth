import React from "react";
import styled from "styled-components";
import { useSynth } from "../state/synth";
import Key from "./Key";

const ControlPanelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RootWrapper = styled.div`
  padding: 20px;
  color: #fff;
  box-shadow: 0 8px 6px -6px black;
  background: #363636;
  border-radius: 8px;
  max-width: 96vw;
`;

const KeyWrapper = styled.div`
  display: flex;
`;

const Synth: React.FC = ({ children }) => {
  const { octave } = useSynth();
  return (
    <RootWrapper>
      <ControlPanelWrapper>
        <h1> qwertySynth </h1>
        {children}
      </ControlPanelWrapper>
      <hr />

      <KeyWrapper>
        <Key variant="white" keyForNote="z" note={`C${octave}`} noMargin />
        <Key variant="white" keyForNote="x" note={`D${octave}`} noMargin />
      </KeyWrapper>
    </RootWrapper>
  );
};

export default Synth;

/*
<Key
          variant="black"
          keyForNote="s"
          soundSettings={{
            ...soundSettings,
            frequency: cSharp * octave,
          }}
        />
        <Key
          variant="white"
          keyForNote="x"
          soundSettings={{
            ...soundSettings,
            frequency: d * octave,
          }}
        />
        <Key
          variant="black"
          keyForNote="d"
          soundSettings={{
            ...soundSettings,
            frequency: dSharp * octave,
          }}
        />
        <Key
          variant="white"
          keyForNote="c"
          soundSettings={{
            ...soundSettings,
            frequency: e * octave,
          }}
        />
        <Key
          variant="white"
          keyForNote="v"
          soundSettings={{
            ...soundSettings,
            frequency: f * octave,
          }}
          noMargin
        />
        <Key
          variant="black"
          keyForNote="g"
          soundSettings={{
            ...soundSettings,
            frequency: fSharp * octave,
          }}
        />
        <Key
          variant="white"
          keyForNote="b"
          soundSettings={{
            ...soundSettings,
            frequency: g * octave,
          }}
        />
        <Key
          variant="black"
          keyForNote="h"
          soundSettings={{
            ...soundSettings,
            frequency: gSharp * octave,
          }}
        />
        <Key
          variant="white"
          keyForNote="n"
          soundSettings={{
            ...soundSettings,
            frequency: a * octave,
          }}
        />
        <Key
          variant="black"
          keyForNote="j"
          soundSettings={{
            ...soundSettings,
            frequency: aSharp * octave,
          }}
        />
        <Key
          variant="white"
          keyForNote="m"
          soundSettings={{
            ...soundSettings,
            frequency: b * octave,
          }}
        />

        <Key
          variant="white"
          keyForNote="q"
          soundSettings={{
            ...soundSettings,
            frequency: c * 2 * octave,
          }}
          noMargin
        />
        <Key
          variant="black"
          keyForNote="2"
          soundSettings={{
            ...soundSettings,
            frequency: cSharp * 2 * octave,
          }}
        />
        <Key
          variant="white"
          keyForNote="w"
          soundSettings={{
            ...soundSettings,
            frequency: d * 2 * octave,
          }}
        />
        <Key
          variant="black"
          keyForNote="3"
          soundSettings={{
            ...soundSettings,
            frequency: dSharp * 2 * octave,
          }}
        />
        <Key
          variant="white"
          keyForNote="e"
          soundSettings={{
            ...soundSettings,
            frequency: e * 2 * octave,
          }}
        />
        <Key
          variant="white"
          keyForNote="r"
          soundSettings={{
            ...soundSettings,
            frequency: f * 2 * octave,
          }}
          noMargin
        />
        <Key
          variant="black"
          keyForNote="5"
          soundSettings={{
            ...soundSettings,
            frequency: fSharp * 2 * octave,
          }}
        />
        <Key
          variant="white"
          keyForNote="t"
          soundSettings={{
            ...soundSettings,
            frequency: g * 2 * octave,
          }}
        />
        <Key
          variant="black"
          keyForNote="6"
          soundSettings={{
            ...soundSettings,
            frequency: gSharp * 2 * octave,
          }}
        />
        <Key
          variant="white"
          keyForNote="y"
          soundSettings={{
            ...soundSettings,
            frequency: a * 2 * octave,
          }}
        />
        <Key
          variant="black"
          keyForNote="7"
          soundSettings={{
            ...soundSettings,
            frequency: aSharp * 2 * octave,
          }}
        />
        <Key
          variant="white"
          keyForNote="u"
          soundSettings={{
            ...soundSettings,
            frequency: b * 2 * octave,
          }}
        />

        <Key
          variant="white"
          keyForNote="i"
          soundSettings={{
            ...soundSettings,
            frequency: c * 4 * octave,
          }}
          noMargin
        />
*/