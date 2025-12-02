import React, { useState } from "react";
import styled from "styled-components";
import { useDrumMachine } from "../../state/drumMachine";

const DrumMachine: React.FC = () => {
    const { tracks, currentStep, swing, dispatch, availableSamples } = useDrumMachine();
    const [selectedTrackIndex, setSelectedTrackIndex] = useState<number | null>(null);

    return (
        <OuterWrapper>
             <MachineCase>
                <Header>
                    <Brand>RHYTHM-8080</Brand>
                    <Controls>
                        <ControlGroup>
                            <Label>Swing</Label>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={swing}
                                onChange={(e) => dispatch({ type: "SET_SWING", payload: parseFloat(e.target.value) })}
                                title={`Swing: ${Math.round(swing * 100)}%`}
                            />
                        </ControlGroup>
                        <ClearButton onClick={() => dispatch({ type: "CLEAR_PATTERN" })}>
                            Clear
                        </ClearButton>
                        <StatusLed />
                    </Controls>
                </Header>
                <Grid>
                    {tracks.map((track, trackIdx) => (
                        <TrackRow key={track.name}>
                            <TrackControl>
                                <TrackLabel onClick={() => setSelectedTrackIndex(selectedTrackIndex === trackIdx ? null : trackIdx)}>
                                    {track.name}
                                </TrackLabel>
                                {selectedTrackIndex === trackIdx && (
                                    <SampleSelector>
                                        <select
                                            value={track.sampleKey}
                                            onChange={(e) => dispatch({ type: "CHANGE_SAMPLE", trackIndex: trackIdx, sampleKey: e.target.value })}
                                        >
                                            {Object.entries(availableSamples[trackIdx].samples).map(([key, url]) => {
                                                const fileName = key.split('/').pop();
                                                return <option key={key} value={key}>{fileName}</option>;
                                            })}
                                        </select>
                                    </SampleSelector>
                                )}
                            </TrackControl>
                            <StepsContainer>
                                {track.steps.map((isActive, stepIdx) => (
                                    <StepKey
                                        key={stepIdx}
                                        data-testid={`step-${trackIdx}-${stepIdx}`}
                                        $active={isActive}
                                        $current={currentStep === stepIdx}
                                        $beatMarker={stepIdx % 4 === 0}
                                        onClick={() => dispatch({ type: "TOGGLE_STEP", trackIndex: trackIdx, stepIndex: stepIdx })}
                                    >
                                        <Led $on={isActive || currentStep === stepIdx} $color={isActive ? "#ff3333" : "#ffff33"} />
                                    </StepKey>
                                ))}
                            </StepsContainer>
                        </TrackRow>
                    ))}
                </Grid>
             </MachineCase>
        </OuterWrapper>
    );
};

export default DrumMachine;

const OuterWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    width: 100%;
`;

const MachineCase = styled.div`
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
    align-items: center;
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
`;

const Brand = styled.div`
    font-family: 'Courier New', monospace;
    font-weight: bold;
    color: #e0e0e0;
    font-size: 1.2rem;
    letter-spacing: 2px;
    text-shadow: 0 1px 2px black;
`;

const Controls = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`;

const ControlGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;

    input[type="range"] {
        -webkit-appearance: none;
        width: 100px;
        height: 4px;
        background: #111;
        border-radius: 2px;
        outline: none;
        box-shadow: inset 0 1px 1px rgba(0,0,0,0.5);

        &::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: #ccc;
            cursor: pointer;
            box-shadow: 0 1px 2px rgba(0,0,0,0.5);
        }
    }
`;

const Label = styled.span`
    font-size: 0.7rem;
    color: #aaa;
    text-transform: uppercase;
    font-weight: bold;
`;

const ClearButton = styled.button`
    background: #a33;
    color: #fff;
    border: 1px solid #600;
    border-radius: 4px;
    padding: 4px 10px;
    font-size: 0.7rem;
    font-weight: bold;
    text-transform: uppercase;
    cursor: pointer;
    box-shadow: 0 2px 0 #500;
    font-family: inherit;

    &:hover {
        background: #c44;
    }

    &:active {
        transform: translateY(2px);
        box-shadow: none;
    }
`;

const StatusLed = styled.div`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #f00;
    box-shadow: 0 0 5px #f00, inset 0 1px 2px rgba(255,255,255,0.5);
    animation: pulse 2s infinite;

    @keyframes pulse {
        0% { opacity: 0.8; }
        50% { opacity: 1; }
        100% { opacity: 0.8; }
    }
`;

const Grid = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    background: #111;
    padding: 15px;
    border-radius: 4px;
    box-shadow: inset 0 2px 5px rgba(0,0,0,0.8);
    border: 1px solid #444;
`;

const TrackRow = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
`;

const TrackControl = styled.div`
    width: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const TrackLabel = styled.div`
    font-size: 0.7rem;
    color: #aaa;
    font-family: sans-serif;
    font-weight: bold;
    text-transform: uppercase;
    cursor: pointer;
    background: #222;
    padding: 4px 8px;
    border-radius: 3px;
    border: 1px solid #000;
    box-shadow: 0 1px 0 rgba(255,255,255,0.1);
    text-align: center;

    &:hover {
        color: #fff;
        background: #333;
    }

    &:active {
        background: #111;
        transform: translateY(1px);
    }
`;

const SampleSelector = styled.div`
    margin-top: 5px;
    select {
        width: 100%;
        font-size: 0.6rem;
        background: #111;
        color: #ccc;
        border: 1px solid #444;
        padding: 2px;
    }
`;

const StepsContainer = styled.div`
    display: flex;
    gap: 4px;
`;

interface StepKeyProps {
    $active: boolean;
    $current: boolean;
    $beatMarker: boolean;
}

const StepKey = styled.div<StepKeyProps>`
    width: 24px;
    height: 36px;
    background: ${props => props.$beatMarker ? '#555' : '#444'};
    border: 1px solid #111;
    border-top: 1px solid rgba(255,255,255,0.1);
    border-radius: 2px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    padding-bottom: 4px;
    box-shadow: 0 2px 2px rgba(0,0,0,0.5);
    position: relative;

    &:hover {
        background: #666;
    }

    &:active {
        background: #333;
        transform: translateY(1px);
        box-shadow: 0 0 1px rgba(0,0,0,0.5);
    }

    ${props => props.$current && `
        border-color: #fff;
        background: #666;
    `}
`;

interface LedProps {
    $on: boolean;
    $color: string;
}

const Led = styled.div<LedProps>`
    width: 8px;
    height: 4px;
    background: ${props => props.$on ? props.$color : '#222'};
    border-radius: 1px;
    box-shadow: ${props => props.$on ? `0 0 4px ${props.$color}` : 'inset 0 1px 1px rgba(0,0,0,0.5)'};
    transition: background 0.05s;
`;
