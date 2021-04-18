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
        <Key variant="black" keyForNote="s" note={`C#${octave}`} />
        <Key variant="white" keyForNote="x" note={`D${octave}`} />
        <Key variant="black" keyForNote="d" note={`D#${octave}`} />
        <Key variant="white" keyForNote="c" note={`E${octave}`} />
        <Key variant="white" keyForNote="v" note={`F${octave}`} noMargin />
        <Key variant="black" keyForNote="g" note={`F#${octave}`} />
        <Key variant="white" keyForNote="b" note={`G${octave}`} />
        <Key variant="black" keyForNote="h" note={`G#${octave}`} />
        <Key variant="white" keyForNote="n" note={`A${octave}`} />
        <Key variant="black" keyForNote="j" note={`A#${octave}`} />
        <Key variant="white" keyForNote="m" note={`B${octave}`} />
        <Key variant="white" keyForNote="q" note={`C${octave + 1}`} />
        <Key variant="black" keyForNote="2" note={`C#${octave + 1}`} />
        <Key variant="white" keyForNote="w" note={`D${octave + 1}`} />
        <Key variant="black" keyForNote="3" note={`D#${octave + 1}`} />
        <Key variant="white" keyForNote="e" note={`E${octave + 1}`} />
        <Key variant="white" keyForNote="r" note={`F${octave + 1}`} noMargin />
        <Key variant="black" keyForNote="5" note={`F#${octave + 1}`} />
        <Key variant="white" keyForNote="t" note={`G${octave + 1}`} />
        <Key variant="black" keyForNote="6" note={`G#${octave + 1}`} />
        <Key variant="white" keyForNote="y" note={`A${octave + 1}`} />
        <Key variant="black" keyForNote="7" note={`A#${octave + 1}`} />
        <Key variant="white" keyForNote="u" note={`B${octave + 1}`} />
        <Key variant="white" keyForNote="i" note={`C${octave + 2}`} noMargin />
      </KeyWrapper>
    </RootWrapper>
  );
};

export default Synth;
