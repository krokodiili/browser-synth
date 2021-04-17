import React from "react";
import styled from "styled-components";
import { KeyProps } from "./types";

interface WhiteKeyProps extends KeyProps {
  noMargin?: boolean;
}

const WhiteKey: React.FC<WhiteKeyProps> = ({
  noMargin,
  pressed,
  keyForNote,
}) => (
  <RootWrapper noMargin={noMargin} pressed={pressed}>
    {keyForNote}
  </RootWrapper>
);

export default WhiteKey;

const RootWrapper = styled.div<Omit<WhiteKeyProps, "keyForNote">>`
  width: 6em;
  height: 24em;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  color: rgba(0, 0, 0, 0.8);
  cursor: pointer;
  box-shadow: ${({ pressed }) => (pressed ? "inset 0 0 2em #979797" : "")};
  padding-bottom: 1em;
  margin-left: ${({ noMargin }) => (noMargin ? "-1px" : "-1.4em")};
  background: #f1f1f1;
  border: 1px solid #979797;
  border-radius: 0 0 8px 8px;
`;
