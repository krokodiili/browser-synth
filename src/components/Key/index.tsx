import React, { useCallback, useEffect, useState } from "react";
import { useSynth } from "../../state/synth";
import BlackKey from "./BlackKey";
import WhiteKey from "./WhiteKey";
import useKeypress from "react-use-keypress";

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
  const [pressed, setPressed] = useState(false);
  const { synth } = useSynth();

  useKeypress([keyForNote], (event) => {
    if (!pressed) {
      setPressed(true);
      synth.triggerAttack(note);
    }
  });

  const handleRelease = useCallback(
    (event) => {
      if (event.key === keyForNote) {
        setPressed(false);
        synth.triggerRelease(note);
      }
    },
    [keyForNote, note, synth]
  );

  useEffect(() => {
    document.body.addEventListener("keyup", handleRelease);

    return () => {
      document.removeEventListener("keyup", handleRelease);
    };
  }, [handleRelease]);

  return (
    <>
      {variant === "white" ? (
        <WhiteKey
          pressed={pressed}
          noMargin={noMargin}
          keyForNote={keyForNote}
        />
      ) : (
        <BlackKey pressed={pressed} keyForNote={keyForNote} />
      )}
    </>
  );
};

export default KeyContainer;
