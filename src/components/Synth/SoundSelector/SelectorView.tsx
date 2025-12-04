import React from "react";
import styled from "styled-components";
import Screen from "../../Screen";
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
      <StyledScreen>
        {`${soundIndex > 0 ? "<" : "|"}
            0${soundIndex + 1}: ${sounds[soundIndex].toUpperCase()}
            ${soundIndex < sounds.length - 1 ? ">" : "|"}
          `}
      </StyledScreen>
      <SoundSelectorButton onClick={onNextSound} flipped />
    </RootWrapper>
  );
};

export default SelectorView;

const RootWrapper = styled.div`
  display: flex;
`;

const StyledScreen = styled(Screen)`
  width: 260px;
  padding: 1em;
  font-size: 1rem;
`;
