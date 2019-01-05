import React from 'react';
import styled from 'styled-components';
import Key from '../containers/Key';

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

const c = '130.81';
const cSharp = '138.59';
const d = '146.83';
const dSharp = '155.56';
const e = '164.81';
const f = '174.61';
const fSharp = '185.00';
const g = '196.00';
const gSharp = '207.65';
const a = '220.0';
const aSharp = '233.08';
const b = '246.94';

export default ({ selectedOctave, selectedSound, children }) => (
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
        soundType={selectedSound}
        frequency={c * selectedOctave}
        noMargin
      />
      <Key
        variant="black"
        keyForNote="s"
        soundType={selectedSound}
        frequency={cSharp * selectedOctave}
      />
      <Key
        variant="white"
        keyForNote="x"
        soundType={selectedSound}
        frequency={d * selectedOctave}
      />
      <Key
        variant="black"
        keyForNote="d"
        soundType={selectedSound}
        frequency={dSharp * selectedOctave}
      />
      <Key
        variant="white"
        keyForNote="c"
        soundType={selectedSound}
        frequency={e * selectedOctave}
      />
      <Key
        variant="white"
        keyForNote="v"
        soundType={selectedSound}
        frequency={f * selectedOctave}
        noMargin
      />
      <Key
        variant="black"
        keyForNote="g"
        soundType={selectedSound}
        frequency={fSharp * selectedOctave}
      />
      <Key
        variant="white"
        keyForNote="b"
        soundType={selectedSound}
        frequency={g * selectedOctave}
      />
      <Key
        variant="black"
        keyForNote="h"
        soundType={selectedSound}
        frequency={gSharp * selectedOctave}
      />
      <Key
        variant="white"
        keyForNote="n"
        soundType={selectedSound}
        frequency={a * selectedOctave}
      />
      <Key
        variant="black"
        keyForNote="j"
        soundType={selectedSound}
        frequency={aSharp * selectedOctave}
      />
      <Key
        variant="white"
        keyForNote="m"
        soundType={selectedSound}
        frequency={b * selectedOctave}
      />

      <Key
        variant="white"
        keyForNote="q"
        soundType={selectedSound}
        frequency={c * 2 * selectedOctave}
        noMargin
      />
      <Key
        variant="black"
        keyForNote="2"
        soundType={selectedSound}
        frequency={cSharp * 2 * selectedOctave}
      />
      <Key
        variant="white"
        keyForNote="w"
        soundType={selectedSound}
        frequency={d * 2 * selectedOctave}
      />
      <Key
        variant="black"
        keyForNote="3"
        soundType={selectedSound}
        frequency={dSharp * 2 * selectedOctave}
      />
      <Key
        variant="white"
        keyForNote="e"
        soundType={selectedSound}
        frequency={e * 2 * selectedOctave}
      />
      <Key
        variant="white"
        keyForNote="r"
        soundType={selectedSound}
        frequency={f * 2 * selectedOctave}
        noMargin
      />
      <Key
        variant="black"
        keyForNote="5"
        soundType={selectedSound}
        frequency={fSharp * 2 * selectedOctave}
      />
      <Key
        variant="white"
        keyForNote="t"
        soundType={selectedSound}
        frequency={g * 2 * selectedOctave}
      />
      <Key
        variant="black"
        keyForNote="6"
        soundType={selectedSound}
        frequency={gSharp * 2 * selectedOctave}
      />
      <Key
        variant="white"
        keyForNote="y"
        soundType={selectedSound}
        frequency={a * 2 * selectedOctave}
      />
      <Key
        variant="black"
        keyForNote="7"
        soundType={selectedSound}
        frequency={aSharp * 2 * selectedOctave}
      />
      <Key
        variant="white"
        keyForNote="u"
        soundType={selectedSound}
        frequency={b * 2 * selectedOctave}
      />

      <Key
        variant="white"
        keyForNote="i"
        soundType={selectedSound}
        frequency={c * 4 * selectedOctave}
        noMargin
      />
    </KeyWrapper>
  </RootWrapper>
);
