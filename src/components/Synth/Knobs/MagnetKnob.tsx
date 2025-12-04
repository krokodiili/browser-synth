import React from "react";
import Knob from "./Knob";
import { useLoop } from "../../LoopingSection/loopState";

const MagnetKnob: React.FC = () => {
  const { quantization, dispatch } = useLoop();

  // Map quantization string to numeric value (0-1) for the knob
  const getKnobValue = (quant: string): number => {
    switch (quant) {
      case "0": return 0; // Off - start fully left
      case "4n": return 0.25;
      case "8n": return 0.5;
      case "16n": return 0.75;
      case "32n": return 1;
      default: return 0;
    }
  };

  // Map numeric value to quantization string
  const getQuantization = (value: number): string => {
    if (value < 0.125) return "0";
    if (value < 0.375) return "4n";
    if (value < 0.625) return "8n";
    if (value < 0.875) return "16n";
    return "32n";
  };

  const getLabel = (quant: string): string => {
    switch (quant) {
        case "0": return "Off";
        case "4n": return "1/4";
        case "8n": return "1/8";
        case "16n": return "1/16";
        case "32n": return "1/32";
        default: return "Off";
    }
  }

  const handleChange = (newValue: number) => {
    const newQuantization = getQuantization(newValue);
    if (newQuantization !== quantization) {
      dispatch({ type: "SET_QUANTIZATION", payload: newQuantization });
    }
  };

  return (
    <Knob
      label="Magnet"
      value={getKnobValue(quantization)}
      onChange={handleChange}
      displayValue={getLabel(quantization)}
    />
  );
};

export default MagnetKnob;
