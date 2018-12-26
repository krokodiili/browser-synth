import React from 'react';
import styled from 'styled-components';
import WhiteKey from './WhiteKey';
import DisplayScreen from './DisplayScreen';
import PowerSwitch from './PowerSwitch';
import Knobs from './Knobs';
import BlackKey from './BlackKey';
import Key from '../containers/Key';

const RootWrapper = styled.div`
  padding: 10px;
  margin: 10px;
  border-radius: 4px;
  color: #fff;
  box-shadow: 0 8px 6px -6px black;
  border: 1px solid black;
  background-color: #f1f1f1;
`;

const ControlWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #123456;
  height: 100px;
  padding: 10px;
`;

const KeyWrapper = styled.div`
  display: flex;
`;

export default () => (
  <RootWrapper>
    <KeyWrapper>
      <Key variant="white" keyForNote="q" frequency="261.6" noMargin />
      <Key variant="black" keyForNote="2" frequency="277.2" />
      <Key variant="white" keyForNote="w" frequency="293.7" />
      <Key variant="black" keyForNote="3" frequency="311.1" />
      <Key variant="white" keyForNote="e" frequency="329.6" />
      <Key variant="white" keyForNote="r" frequency="349.2" noMargin />
      <Key variant="black" keyForNote="5" frequency="370.0" />
      <Key variant="white" keyForNote="t" frequency="392.0" />
      <Key variant="black" keyForNote="6" frequency="415.3" />
      <Key variant="white" keyForNote="y" frequency="440.0" />
      <Key variant="black" keyForNote="7" frequency="466.2" />
      <Key variant="white" keyForNote="u" frequency="493.3" />
    </KeyWrapper>
  </RootWrapper>
);
