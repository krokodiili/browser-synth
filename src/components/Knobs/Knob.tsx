import React, { useState, useRef, useEffect } from "react";
import { Knob, Arc, Pointer } from "rc-knob";
import styled from "styled-components";

interface Props {
  label: string;
  value: number;
  onChange: (value: number) => void;
  displayValue?: string;
}

const SoundKnob: React.FC<Props> = ({ label, value, onChange, displayValue }) => {
  const [isDragging, setIsDragging] = useState(false);
  const startYRef = useRef<number | null>(null);
  const startValueRef = useRef<number>(value);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startYRef.current = e.clientY;
    startValueRef.current = value;

    document.body.style.cursor = 'ns-resize';
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (startYRef.current === null) return;

      const sensitivity = 0.008;
      const deltaY = startYRef.current - e.clientY;

      let newValue = startValueRef.current + (deltaY * sensitivity);
      newValue = Math.max(0, Math.min(1, newValue));

      onChange(newValue);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      startYRef.current = null;
      document.body.style.cursor = '';
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
    };
  }, [isDragging, onChange]);

  // Determine what to display in the center
  const centerText = displayValue ?? Math.round(value * 100).toString();

  return (
    <KnobContainer>
      <KnobWrapper onMouseDown={handleMouseDown}>
        <StyledKnobContainer>
            <Knob
            value={value}
            size={50}
            angleOffset={220}
            angleRange={280}
            min={0}
            max={1}
            className="styledKnob"
            >
            <Arc arcWidth={3} background="#333" color="#00ff00" radius={22} />
            <circle r="20" cx="25" cy="25" fill="#222" stroke="#111" strokeWidth="2" />
            <Pointer width={3} height={15} radius={5} type="rect" color="#ccc" />
            <text
              x="25"
              y="25"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#fff"
              fontSize="12"
              fontWeight="bold"
              style={{ pointerEvents: "none", userSelect: "none", textShadow: "0 0 2px #00ff00" }}
            >
              {centerText}
            </text>
            </Knob>
        </StyledKnobContainer>
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
  cursor: ns-resize;
`;

const StyledKnobContainer = styled.div`
    pointer-events: none;
`;

const Label = styled.div`
  font-size: 0.6rem;
  color: #aaa;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 1px;
`;
