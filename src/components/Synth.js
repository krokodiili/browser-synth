import React from "react";
import styled from "styled-components";
import Key from "../containers/Key";

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

const c = "130.81";
const cSharp = "138.59";
const d = "146.83";
const dSharp = "155.56";
const e = "164.81";
const f = "174.61";
const fSharp = "185.00";
const g = "196.00";
const gSharp = "207.65";
const a = "220.0";
const aSharp = "233.08";
const b = "246.94";

const Synth = ({ children, ...soundSettings }) => {
  const { selectedOctave } = soundSettings;
  return (
    <RootWrapper>
      <ControlPanelWrapper>
        <h1> qwertySynth </h1>
        {children}
      </ControlPanelWrapper>
      <hr />

      <KeyWrapper>
        <Key
          variant="white"
          keyForNote="z"
          soundSettings={soundSettings}
          frequency={c * selectedOctave}
          noMargin
        />
        <Key
          variant="black"
          keyForNote="s"
          soundSettings={soundSettings}
          frequency={cSharp * selectedOctave}
        />
        <Key
          variant="white"
          keyForNote="x"
          soundSettings={soundSettings}
          frequency={d * selectedOctave}
        />
        <Key
          variant="black"
          keyForNote="d"
          soundSettings={soundSettings}
          frequency={dSharp * selectedOctave}
        />
        <Key
          variant="white"
          keyForNote="c"
          soundSettings={soundSettings}
          frequency={e * selectedOctave}
        />
        <Key
          variant="white"
          keyForNote="v"
          soundSettings={soundSettings}
          frequency={f * selectedOctave}
          noMargin
        />
        <Key
          variant="black"
          keyForNote="g"
          soundSettings={soundSettings}
          frequency={fSharp * selectedOctave}
        />
        <Key
          variant="white"
          keyForNote="b"
          soundSettings={soundSettings}
          frequency={g * selectedOctave}
        />
        <Key
          variant="black"
          keyForNote="h"
          soundSettings={soundSettings}
          frequency={gSharp * selectedOctave}
        />
        <Key
          variant="white"
          keyForNote="n"
          soundSettings={soundSettings}
          frequency={a * selectedOctave}
        />
        <Key
          variant="black"
          keyForNote="j"
          soundSettings={soundSettings}
          frequency={aSharp * selectedOctave}
        />
        <Key
          variant="white"
          keyForNote="m"
          soundSettings={soundSettings}
          frequency={b * selectedOctave}
        />

        <Key
          variant="white"
          keyForNote="q"
          soundSettings={soundSettings}
          frequency={c * 2 * selectedOctave}
          noMargin
        />
        <Key
          variant="black"
          keyForNote="2"
          soundSettings={soundSettings}
          frequency={cSharp * 2 * selectedOctave}
        />
        <Key
          variant="white"
          keyForNote="w"
          soundSettings={soundSettings}
          frequency={d * 2 * selectedOctave}
        />
        <Key
          variant="black"
          keyForNote="3"
          soundSettings={soundSettings}
          frequency={dSharp * 2 * selectedOctave}
        />
        <Key
          variant="white"
          keyForNote="e"
          soundSettings={soundSettings}
          frequency={e * 2 * selectedOctave}
        />
        <Key
          variant="white"
          keyForNote="r"
          soundSettings={soundSettings}
          frequency={f * 2 * selectedOctave}
          noMargin
        />
        <Key
          variant="black"
          keyForNote="5"
          soundSettings={soundSettings}
          frequency={fSharp * 2 * selectedOctave}
        />
        <Key
          variant="white"
          keyForNote="t"
          soundSettings={soundSettings}
          frequency={g * 2 * selectedOctave}
        />
        <Key
          variant="black"
          keyForNote="6"
          soundSettings={soundSettings}
          frequency={gSharp * 2 * selectedOctave}
        />
        <Key
          variant="white"
          keyForNote="y"
          soundSettings={soundSettings}
          frequency={a * 2 * selectedOctave}
        />
        <Key
          variant="black"
          keyForNote="7"
          soundSettings={soundSettings}
          frequency={aSharp * 2 * selectedOctave}
        />
        <Key
          variant="white"
          keyForNote="u"
          soundSettings={soundSettings}
          frequency={b * 2 * selectedOctave}
        />

        <Key
          variant="white"
          keyForNote="i"
          soundSettings={soundSettings}
          frequency={c * 4 * selectedOctave}
          noMargin
        />
      </KeyWrapper>
    </RootWrapper>
  );
};

export default Synth;
