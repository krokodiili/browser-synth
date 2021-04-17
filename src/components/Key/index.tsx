import React, { Component, useEffect, useState } from "react";
import { useSynth } from "../../state/synth";
import BlackKey from "./BlackKey";
import WhiteKey from "./WhiteKey";
import * as Tone from "tone";

interface Props {
  variant: "white" | "black";
  keyForNote: string;
  noMargin?: boolean;
  note: string;
}

const KeyContainer: React.FC<Props> = ({
  variant,
  keyForNote,
  noMargin,
  note,
}) => {
  const [pressed, setPressedState] = useState(false);
  const { synth } = useSynth();

  //Event listeners cannot accerss the current state, fix that with refs
  const pressedRef = React.useRef(pressed);
  const setPressed = (value) => {
    pressedRef.current = value;
    setPressedState(value);
  };

  const handlePress = (event) => {
    if (event.key === keyForNote && !pressedRef.current) {
      setPressed(true);
      synth.triggerAttack(note);
    }
  };

  const handleRelease = (event) => {
    if (event.key === keyForNote) {
      setPressed(false);
      synth.triggerRelease(note);
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", handlePress);
    document.body.addEventListener("keyup", handleRelease);

    return () => {
      document.removeEventListener("keydown", handlePress);
      document.removeEventListener("keyup", handleRelease);
    };
  }, []);

  return (
    <div>
      {variant === "white" ? (
        <WhiteKey
          pressed={pressed}
          noMargin={noMargin}
          keyForNote={keyForNote}
        />
      ) : (
        <BlackKey pressed={pressed} keyForNote={keyForNote} />
      )}
    </div>
  );
};

export default KeyContainer;
