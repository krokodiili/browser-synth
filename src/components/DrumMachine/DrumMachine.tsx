import React, { useState } from "react";
import styled from "styled-components";
import { useDrumMachine } from "../../state/drumMachine";

const DrumMachine: React.FC = () => {
    const { tracks, currentStep, dispatch, availableSamples } = useDrumMachine();
    const [selectedTrackIndex, setSelectedTrackIndex] = useState<number | null>(null);

    return (
        <Wrapper>
            <Header>Drum Machine</Header>
            <Grid>
                {tracks.map((track, trackIdx) => (
                    <TrackRow key={track.name}>
                        <TrackControl>
                            <TrackName onClick={() => setSelectedTrackIndex(selectedTrackIndex === trackIdx ? null : trackIdx)}>
                                {track.name}
                            </TrackName>
                            {selectedTrackIndex === trackIdx && (
                                <SampleSelector>
                                    <select
                                        value={track.sampleKey}
                                        onChange={(e) => dispatch({ type: "CHANGE_SAMPLE", trackIndex: trackIdx, sampleKey: e.target.value })}
                                    >
                                        {Object.entries(availableSamples[trackIdx].samples).map(([key, url]) => {
                                             // Key is the full path. Let's try to make it prettier.
                                             // e.g., /src/assets/drums/kick/kick.mp3 -> kick.mp3
                                             const fileName = key.split('/').pop();
                                             return <option key={key} value={key}>{fileName}</option>;
                                        })}
                                    </select>
                                </SampleSelector>
                            )}
                        </TrackControl>
                        <StepsContainer>
                            {track.steps.map((isActive, stepIdx) => (
                                <StepButton
                                    key={stepIdx}
                                    data-testid={`step-${trackIdx}-${stepIdx}`}
                                    $active={isActive}
                                    $current={currentStep === stepIdx}
                                    onClick={() => dispatch({ type: "TOGGLE_STEP", trackIndex: trackIdx, stepIndex: stepIdx })}
                                />
                            ))}
                        </StepsContainer>
                    </TrackRow>
                ))}
            </Grid>
        </Wrapper>
    );
};

export default DrumMachine;

const Wrapper = styled.div`
    background: #444;
    padding: 10px;
    border-radius: 5px;
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid #555;
`;

const Header = styled.div`
    font-size: 0.8rem;
    color: #ccc;
    margin-bottom: 5px;
    text-transform: uppercase;
    letter-spacing: 1px;
`;

const Grid = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

const TrackRow = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const TrackControl = styled.div`
    width: 120px;
    display: flex;
    flex-direction: column;
`;

const TrackName = styled.div`
    font-size: 0.8rem;
    color: #fff;
    cursor: pointer;
    &:hover {
        color: #aaa;
    }
`;

const SampleSelector = styled.div`
    margin-top: 2px;
    select {
        width: 100%;
        font-size: 0.7rem;
        background: #222;
        color: #fff;
        border: 1px solid #555;
    }
`;

const StepsContainer = styled.div`
    display: flex;
    gap: 2px;
`;

interface StepButtonProps {
    $active: boolean;
    $current: boolean;
}

const StepButton = styled.div<StepButtonProps>`
    width: 20px;
    height: 30px;
    background-color: ${(props) => (props.$active ? "#ff5555" : "#333")};
    border: 1px solid ${(props) => (props.$current ? "#fff" : "#222")};
    cursor: pointer;
    border-radius: 2px;
    opacity: ${(props) => (props.$active ? 1 : 0.6)};

    &:hover {
        background-color: ${(props) => (props.$active ? "#ff7777" : "#444")};
    }
`;
