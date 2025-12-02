import React from "react";
import { Knob, Arc, Pointer, Value } from "rc-knob";
import styled from "styled-components";

interface Props {
  label: string;
  value: number;
  onChange: (value: number) => void;
}

const SoundKnob: React.FC<Props> = ({ label, value, onChange }) => {
  return (
    <KnobContainer>
      <KnobWrapper>
        <Knob
          value={value}
          size={50}
          angleOffset={220}
          angleRange={280}
          min={0}
          max={1}
          className="styledKnob"
          onChange={(value) => onChange(value)}
        >
          <Arc arcWidth={4} background="#333" color="#00ff00" />
          <circle r="40" cx="50" cy="50" fill="#222" stroke="#111" strokeWidth="2" />
          <Pointer width={4} height={20} radius={8} type="rect" color="#ccc" />
        </Knob>
      </KnobWrapper>
      <Label>{label}</Label>
    </KnobContainer>
  );
};

export default SoundKnob;

const KnobContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const KnobWrapper = styled.div`
  /* Custom styles for the rc-knob if needed,
     but passing props to Arc/circle usually works best.
     We might need to override some SVG defaults via CSS if rc-knob is stubborn.
  */
  filter: drop-shadow(0 2px 2px rgba(0,0,0,0.5));

  /* Helper to ensure the SVG is responsive or sized correctly */
  width: 50px;
  height: 50px;
`;

const Label = styled.div`
  font-size: 0.6rem;
  color: #aaa;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 1px;
`;
