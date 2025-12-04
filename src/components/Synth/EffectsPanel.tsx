import React, { useState } from "react";
import styled from "styled-components";
import { useSynth } from "./synthState";
import Knob from "./Knobs/Knob";
import Screen from "../Screen";
import RubberButton from "../RubberButton";

type EffectType = "chorus" | "delay" | "reverb";

const EffectsPanel: React.FC = () => {
  const { reverb, delay, chorus, dispatch } = useSynth();
  const [selectedFx, setSelectedFx] = useState<EffectType>("chorus");

  const renderKnobs = () => {
    switch (selectedFx) {
      case "chorus":
        return (
          <>
            <Knob
              label="Mix"
              value={chorus.mix}
              onChange={(val) =>
                dispatch({ type: "SET_CHORUS", payload: { mix: val } })
              }
            />
            <Knob
              label="Depth"
              value={chorus.depth}
              onChange={(val) =>
                dispatch({ type: "SET_CHORUS", payload: { depth: val } })
              }
            />
            <Knob
              label="Rate"
              value={(chorus.frequency - 0.1) / (10 - 0.1)}
              displayValue={chorus.frequency.toFixed(1) + "Hz"}
              onChange={(val) => {
                const freq = val * (10 - 0.1) + 0.1;
                dispatch({ type: "SET_CHORUS", payload: { frequency: freq } });
              }}
            />
          </>
        );
      case "delay":
        return (
          <>
            <Knob
              label="Mix"
              value={delay.mix}
              onChange={(val) =>
                dispatch({ type: "SET_DELAY", payload: { mix: val } })
              }
            />
            <Knob
              label="Time"
              value={delay.delayTime}
              displayValue={(delay.delayTime * 1000).toFixed(0) + "ms"}
              onChange={(val) =>
                dispatch({ type: "SET_DELAY", payload: { delayTime: val } })
              }
            />
            <Knob
              label="Fdbk"
              value={delay.feedback}
              onChange={(val) =>
                dispatch({ type: "SET_DELAY", payload: { feedback: val } })
              }
            />
          </>
        );
      case "reverb":
        return (
          <>
            <Knob
              label="Mix"
              value={reverb.mix}
              onChange={(val) =>
                dispatch({ type: "SET_REVERB", payload: { mix: val } })
              }
            />
            <Knob
              label="Decay"
              value={(reverb.decay - 0.1) / (10 - 0.1)}
              displayValue={reverb.decay.toFixed(1) + "s"}
              onChange={(val) => {
                const decay = val * (10 - 0.1) + 0.1;
                dispatch({ type: "SET_REVERB", payload: { decay: decay } });
              }}
            />
            <Knob
              label="Pre"
              value={reverb.preDelay / 0.5}
              displayValue={(reverb.preDelay * 1000).toFixed(0) + "ms"}
              onChange={(val) => {
                dispatch({
                  type: "SET_REVERB",
                  payload: { preDelay: val * 0.5 },
                });
              }}
            />
          </>
        );
    }
  };

  return (
    <PanelWrapper>
      <Selectors>
        <FxButton
          $active={selectedFx === "chorus"}
          onClick={() => setSelectedFx("chorus")}
        >
          CHO
        </FxButton>
        <FxButton
          $active={selectedFx === "delay"}
          onClick={() => setSelectedFx("delay")}
        >
          DLY
        </FxButton>
        <FxButton
          $active={selectedFx === "reverb"}
          onClick={() => setSelectedFx("reverb")}
        >
          REV
        </FxButton>
      </Selectors>

      <ScreenWrapper>
        <Screen style={{ width: "100%", fontSize: "1rem" }}>
          FX: {selectedFx.toUpperCase()}
        </Screen>
      </ScreenWrapper>

      <KnobRow>{renderKnobs()}</KnobRow>
    </PanelWrapper>
  );
};

export default EffectsPanel;

const PanelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  background: #222;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #333;
  box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.5);
  align-items: center;
  min-width: 250px;
`;

const Selectors = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  justify-content: space-between;
`;

const FxButton = styled(RubberButton)<{ $active: boolean }>`
  width: 100%;
  padding: 8px 0;
  font-size: 0.7rem;
  font-weight: bold;
  color: ${(props) => (props.$active ? "#4bd83a" : "#666")};
  background: ${(props) => (props.$active ? "#1a1a1a" : "#333")};
  box-shadow: ${(props) =>
    props.$active
      ? "inset 0 1px 3px rgba(0,0,0,0.8)"
      : "0 2px 2px rgba(0,0,0,0.3)"};
  border: 1px solid ${(props) => (props.$active ? "#000" : "#444")};

  &:active {
    background: #111;
    transform: translateY(1px);
  }
`;

const ScreenWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const KnobRow = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  width: 100%;
`;
