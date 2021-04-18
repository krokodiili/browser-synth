import React from "react";
import styled from "styled-components";
import SoundSelectorButton from "./SoundSelectorButton";

interface Props {
  sounds: string[];
  onNextSound: () => void;
  onPreviousSound: () => void;
  soundIndex: number;
}

const SelectorView: React.FC<Props> = ({
  sounds,
  onNextSound,
  onPreviousSound,
  soundIndex,
}) => {
  return (
    <RootWrapper>
      <SoundSelectorButton onClick={onPreviousSound} />
      <ScreenWrapper>
        <ArcadeText>
          {`${soundIndex > 0 ? "<" : "|"}
            0${soundIndex + 1}: ${sounds[soundIndex].toUpperCase()}
            ${soundIndex < sounds.length - 1 ? ">" : "|"}
          `}
        </ArcadeText>
      </ScreenWrapper>
      <SoundSelectorButton onClick={onNextSound} flipped />
    </RootWrapper>
  );
};

export default SelectorView;

const RootWrapper = styled.div`
  display: flex;
`;

const ScreenWrapper = styled.div`
  width: 260px;
  background-color: #1f7307;
  padding: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: black;
`;

const ArcadeText = styled.p`
  font-family: "arcade";
  font-size: 16px;
`;
