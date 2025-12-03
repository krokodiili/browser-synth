import React from "react";
import styled from "styled-components";
import { useSynth } from "../state/synth";
import Key from "./Key";
import RubberButton from "./RubberButton";
import EffectsPanel from "./EffectsPanel";

const Synth: React.FC = ({ children }) => {
  const { octave, tracks, selectedTrackId, dispatch } = useSynth();
  return (
    <RootWrapper>
      <Case>
        <Header>
          <Brand>qwertySynth</Brand>
          <TrackSelector>
            {tracks.map((track) => (
              <TrackButton
                key={track.id}
                onClick={() => dispatch({ type: "SELECT_TRACK", payload: track.id })}
                $active={selectedTrackId === track.id}
              >
                <TrackLed $active={selectedTrackId === track.id} />
                Track {track.id + 1}
              </TrackButton>
            ))}
          </TrackSelector>
        </Header>

        <ControlsSection>
           {children}
           <EffectsPanel />
        </ControlsSection>

        <KeybedSection>
          <KeyWrapper>
            <Key variant="white" keyForNote="z" note={`C${octave}`} noMargin />
            <Key variant="black" keyForNote="s" note={`C#${octave}`} />
            <Key variant="white" keyForNote="x" note={`D${octave}`} />
            <Key variant="black" keyForNote="d" note={`D#${octave}`} />
            <Key variant="white" keyForNote="c" note={`E${octave}`} />
            <Key variant="white" keyForNote="v" note={`F${octave}`} noMargin />
            <Key variant="black" keyForNote="g" note={`F#${octave}`} />
            <Key variant="white" keyForNote="b" note={`G${octave}`} />
            <Key variant="black" keyForNote="h" note={`G#${octave}`} />
            <Key variant="white" keyForNote="n" note={`A${octave}`} />
            <Key variant="black" keyForNote="j" note={`A#${octave}`} />
            <Key variant="white" keyForNote="m" note={`B${octave}`} />
            <Key variant="white" keyForNote="q" note={`C${octave + 1}`} noMargin />
            <Key variant="black" keyForNote="2" note={`C#${octave + 1}`} />
            <Key variant="white" keyForNote="w" note={`D${octave + 1}`} />
            <Key variant="black" keyForNote="3" note={`D#${octave + 1}`} />
            <Key variant="white" keyForNote="e" note={`E${octave + 1}`} />
            <Key variant="white" keyForNote="r" note={`F${octave + 1}`} noMargin />
            <Key variant="black" keyForNote="5" note={`F#${octave + 1}`} />
            <Key variant="white" keyForNote="t" note={`G${octave + 1}`} />
            <Key variant="black" keyForNote="6" note={`G#${octave + 1}`} />
            <Key variant="white" keyForNote="y" note={`A${octave + 1}`} />
            <Key variant="black" keyForNote="7" note={`A#${octave + 1}`} />
            <Key variant="white" keyForNote="u" note={`B${octave + 1}`} />
            <Key variant="white" keyForNote="i" note={`C${octave + 2}`} noMargin />
          </KeyWrapper>
        </KeybedSection>
      </Case>
    </RootWrapper>
  );
};

export default Synth;

const RootWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
`;

const Case = styled.div`
  background: #2a2a2a;
  padding: 20px;
  border-radius: 10px;
  box-shadow:
    inset 0 1px 1px rgba(255,255,255,0.1),
    0 10px 20px rgba(0,0,0,0.5),
    0 0 0 1px #1a1a1a;
  border-bottom: 4px solid #111;
  max-width: 98vw;
  width: fit-content;
  display: flex;
  flex-direction: column;
  background-image: linear-gradient(180deg, #333 0%, #222 100%);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 15px;
  align-items: center;
  border-bottom: 2px solid #111;
  padding-bottom: 10px;
  box-shadow: 0 1px 0 rgba(255,255,255,0.05);
  flex-wrap: wrap;
  gap: 10px;
`;

const Brand = styled.div`
  font-family: 'Courier New', monospace;
  font-weight: bold;
  color: #e0e0e0;
  font-size: 1.2rem;
  letter-spacing: 2px;
  text-shadow: 0 1px 2px black;
`;

const ControlsSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  /* Make children responsive */
  & > * {
    flex: 1 1 auto;
    min-width: 0;
  }
`;

const KeybedSection = styled.div`
  background: #111;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #000;
  box-shadow: inset 0 2px 5px rgba(0,0,0,0.5);
`;

const KeyWrapper = styled.div`
  display: flex;
  overflow-x: auto;

  /* Hide scrollbar but allow scroll */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
`;

const TrackSelector = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const TrackButton = styled(RubberButton)<{ $active: boolean }>`
  width: 80px;
  height: 35px;
  font-size: 0.7rem;
  background-color: ${(props) => (props.$active ? "#222" : "#383838")};
  color: ${(props) => (props.$active ? "#ccc" : "#aaa")};
  box-shadow: ${(props) => (props.$active ? "inset 0 2px 5px rgba(0,0,0,0.8), 0 0 1px rgba(255,255,255,0.05)" : "inset 0 1px 1px rgba(255,255,255,0.1), 0 2px 2px rgba(0,0,0,0.5)")};
  border: 1px solid ${(props) => (props.$active ? "#111" : "#222")};
  transform: ${(props) => (props.$active ? "translateY(2px)" : "none")};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;

  &:active {
    background-color: #222;
    transform: translateY(2px);
    box-shadow: inset 0 2px 5px rgba(0,0,0,0.8);
  }
`;

const TrackLed = styled.div<{ $active: boolean }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${(props) => (props.$active ? "#00ff00" : "#223322")};
  box-shadow: ${(props) => (props.$active ? "0 0 4px #00ff00" : "inset 0 1px 2px rgba(0,0,0,0.5)")};
  margin-right: 5px;
`;
