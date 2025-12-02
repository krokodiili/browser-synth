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
          <Arc arcWidth={3} background="#333" color="#00ff00" radius={22} />
          <circle r="20" cx="25" cy="25" fill="#222" stroke="#111" strokeWidth="2" />
          <Pointer width={3} height={15} radius={5} type="rect" color="#ccc" />
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
  filter: drop-shadow(0 2px 2px rgba(0,0,0,0.5));
  width: 50px;
  height: 50px;

  /* Ensure the pointer rotates correctly by setting transform-origin if needed,
     though rc-knob handles this. */
`;

const Label = styled.div`
  font-size: 0.6rem;
  color: #aaa;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 1px;
`;
