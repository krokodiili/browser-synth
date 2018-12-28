import React from 'react';
import styled from 'styled-components';
import Key from '../containers/Key';

const RootWrapper = styled.div`
  padding: 10px;
  margin: 10px;
  border-radius: 4px;
  color: #fff;
  box-shadow: 0 8px 6px -6px black;
  border: 1px solid black;
  background-color: #444;
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

export default ({ selectedOctave }) => (
  <RootWrapper>
    <span role="img" aria-label="logo" style={{ fontSize: 50 }}>
      🐊
    </span>

    <hr />

    <KeyWrapper>
      <Key
        variant="white"
        keyForNote="z"
        frequency={c * selectedOctave}
        noMargin
      />
      <Key variant="black" keyForNote="s" frequency={cSharp * selectedOctave} />
      <Key variant="white" keyForNote="x" frequency={d * selectedOctave} />
      <Key variant="black" keyForNote="d" frequency={dSharp * selectedOctave} />
      <Key variant="white" keyForNote="c" frequency={e * selectedOctave} />
      <Key
        variant="white"
        keyForNote="v"
        frequency={f * selectedOctave}
        noMargin
      />
      <Key variant="black" keyForNote="g" frequency={fSharp * selectedOctave} />
      <Key variant="white" keyForNote="b" frequency={g * selectedOctave} />
      <Key variant="black" keyForNote="h" frequency={gSharp * selectedOctave} />
      <Key variant="white" keyForNote="n" frequency={a * selectedOctave} />
      <Key variant="black" keyForNote="j" frequency={aSharp * selectedOctave} />
      <Key variant="white" keyForNote="m" frequency={b * selectedOctave} />

      <Key
        variant="white"
        keyForNote="q"
        frequency={c * 2 * selectedOctave}
        noMargin
      />
      <Key
        variant="black"
        keyForNote="2"
        frequency={cSharp * 2 * selectedOctave}
      />
      <Key variant="white" keyForNote="w" frequency={d * 2 * selectedOctave} />
      <Key
        variant="black"
        keyForNote="3"
        frequency={dSharp * 2 * selectedOctave}
      />
      <Key variant="white" keyForNote="e" frequency={e * 2 * selectedOctave} />
      <Key
        variant="white"
        keyForNote="r"
        frequency={f * 2 * selectedOctave}
        noMargin
      />
      <Key
        variant="black"
        keyForNote="5"
        frequency={fSharp * 2 * selectedOctave}
      />
      <Key variant="white" keyForNote="t" frequency={g * 2 * selectedOctave} />
      <Key
        variant="black"
        keyForNote="6"
        frequency={gSharp * 2 * selectedOctave}
      />
      <Key variant="white" keyForNote="y" frequency={a * 2 * selectedOctave} />
      <Key
        variant="black"
        keyForNote="7"
        frequency={aSharp * 2 * selectedOctave}
      />
      <Key variant="white" keyForNote="u" frequency={b * 2 * selectedOctave} />

      <Key
        variant="white"
        keyForNote="i"
        frequency={c * 4 * selectedOctave}
        noMargin
      />
      <Key
        variant="black"
        keyForNote="9"
        frequency={cSharp * 4 * selectedOctave}
      />
      <Key variant="white" keyForNote="o" frequency={d * 4 * selectedOctave} />
      <Key
        variant="black"
        keyForNote="0"
        frequency={dSharp * 4 * selectedOctave}
      />
      <Key variant="white" keyForNote="p" frequency={e * 4 * selectedOctave} />
    </KeyWrapper>
  </RootWrapper>
);
