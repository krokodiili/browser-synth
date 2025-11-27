import React from "react";
import { Knob, Arc, Pointer } from "rc-knob";
import styled from "styled-components";

interface Props {
  label: string;
  value: number;
  onChange: (value: number) => void;
}

const SoundKnob: React.FC<Props> = ({ label, value, onChange }) => {
  return (
    <RootWrapper>
      <Knob
        value={value}
        size={100}
        angleOffset={220}
        angleRange={280}
        min={0}
        max={1}
        className="styledKnob"
        onChange={(value) => onChange(value)}
      >
        <Arc arcWidth={1.5} />
        <circle r="40" cx="50" cy="50" />
        <Pointer width={2} height={35} radius={10} type="rect" color="#fff" />
      </Knob>
      <h3>{label}</h3>
    </RootWrapper>
  );
};

const RootWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export default SoundKnob;
