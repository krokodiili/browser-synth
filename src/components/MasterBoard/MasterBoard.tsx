import React from "react";
import styled from "styled-components";
import { useLoop } from "../LoopingSection/loopState";

const MasterBoard: React.FC = () => {
    const { isMetronomeOn, dispatch } = useLoop();

    return (
        <Wrapper>
            <Header>MASTER</Header>
            <KeyGrid>
                <KeyContainer>
                    <MacroKey
                        $active={isMetronomeOn}
                        onClick={() => dispatch({ type: "TOGGLE_METRONOME" })}
                    >
                        METRONOME
                    </MacroKey>
                    <StatusLed $on={isMetronomeOn} />
                </KeyContainer>
            </KeyGrid>
        </Wrapper>
    );
};

export default MasterBoard;

const Wrapper = styled.div`
    background: #1a1a1a;
    padding: 15px;
    border-radius: 8px;
    box-shadow:
        inset 0 1px 1px rgba(255,255,255,0.1),
        0 10px 20px rgba(0,0,0,0.5),
        0 0 0 1px #000;
    margin-right: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-bottom: 4px solid #000;
`;

const Header = styled.div`
    font-family: 'Courier New', monospace;
    color: #888;
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 10px;
    letter-spacing: 2px;
    border-bottom: 1px solid #333;
    width: 100%;
    text-align: center;
    padding-bottom: 5px;
`;

const KeyGrid = styled.div`
    display: flex;
    gap: 10px;
`;

const KeyContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
`;

interface MacroKeyProps {
    $active: boolean;
}

const MacroKey = styled.div<MacroKeyProps>`
    width: 60px;
    height: 60px;
    background: #333;
    border-radius: 6px;
    border: 1px solid #000;
    box-shadow:
        0 4px 0 #000,
        0 5px 5px rgba(0,0,0,0.5),
        inset 0 1px 1px rgba(255,255,255,0.1);
    color: #ccc;
    font-size: 0.6rem;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    cursor: pointer;
    transition: all 0.1s;
    user-select: none;
    font-family: sans-serif;

    &:active {
        transform: translateY(4px);
        box-shadow:
            0 0 0 #000,
            inset 0 1px 2px rgba(0,0,0,0.5);
    }

    ${props => props.$active && `
        color: #fff;
        text-shadow: 0 0 5px rgba(255,255,255,0.5);
    `}
`;

interface LedProps {
    $on: boolean;
}

const Led = styled.div<LedProps>`
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${props => props.$on ? '#0f0' : '#222'};
    box-shadow: ${props => props.$on ? '0 0 5px #0f0' : 'inset 0 1px 2px rgba(0,0,0,0.5)'};
    transition: background 0.1s;
`;

const StatusLed = styled(Led)`
    margin-top: -4px;
`;
