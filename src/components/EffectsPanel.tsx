import React from "react";
import styled from "styled-components";
import { useSynth } from "../state/synth";
import Knob from "./Knobs/Knob";
import Screen from "./Screen";

const EffectsPanel: React.FC = () => {
  const { reverb, delay, chorus, dispatch } = useSynth();

  return (
    <PanelWrapper>
      <Module>
        <ModuleHeader>Chorus</ModuleHeader>
        <KnobRow>
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
               // Map 0-1 to 0.1Hz - 10Hz
               const freq = val * (10 - 0.1) + 0.1;
               dispatch({ type: "SET_CHORUS", payload: { frequency: freq } });
            }}
          />
        </KnobRow>
      </Module>

      <Module>
        <ModuleHeader>Delay</ModuleHeader>
        <KnobRow>
          <Knob
            label="Mix"
            value={delay.mix}
            onChange={(val) =>
              dispatch({ type: "SET_DELAY", payload: { mix: val } })
            }
          />
          <Knob
            label="Time"
            value={delay.delayTime} // Delay time 0-1s
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
        </KnobRow>
      </Module>

      <Module>
        <ModuleHeader>Reverb</ModuleHeader>
        <KnobRow>
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
              // Map 0-1 to 0.1 - 10
              const decay = val * (10 - 0.1) + 0.1;
              dispatch({ type: "SET_REVERB", payload: { decay: decay } });
            }}
          />
          <Knob
            label="Pre"
            value={reverb.preDelay / 0.5} // Assumed max preDelay 0.5s
            displayValue={(reverb.preDelay * 1000).toFixed(0) + "ms"}
            onChange={(val) => {
                // Map 0-1 to 0 - 0.5s
                dispatch({ type: "SET_REVERB", payload: { preDelay: val * 0.5 } })
            }}
          />
        </KnobRow>
      </Module>
    </PanelWrapper>
  );
};

export default EffectsPanel;

const PanelWrapper = styled.div`
  display: flex;
  gap: 15px;
  background: #222;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #333;
  box-shadow: inset 0 2px 5px rgba(0,0,0,0.5);
  flex-wrap: wrap;
  justify-content: center;
`;

const Module = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  background: #1a1a1a;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #111;
  box-shadow: 0 1px 2px rgba(0,0,0,0.3);
`;

const ModuleHeader = styled.div`
  font-family: 'Courier New', monospace;
  font-size: 0.8rem;
  font-weight: bold;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 1px;
  background: #111;
  padding: 2px 6px;
  border-radius: 2px;
  width: 100%;
  text-align: center;
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.5);
`;

const KnobRow = styled.div`
  display: flex;
  gap: 10px;
`;
