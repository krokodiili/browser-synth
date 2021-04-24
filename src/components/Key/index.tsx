import React, { useCallback, useEffect, useState } from "react";
import { useSynth } from "../../state/synth";
import BlackKey from "./BlackKey";
import WhiteKey from "./WhiteKey";
import useKeypress from "react-use-keypress";
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
  const [pressed, setPressed] = useState(false);
  const { synth, recording, dispatch } = useSynth();

  useKeypress([keyForNote], (event) => {
    if (!pressed) {
      if (recording) {
        const [bar, beat, sixteenth] = Tone.Transport.position
          .toString()
          .split(":");
        dispatch({
          type: "RECORD_NOTE",
          payload: {
            note,
            time: `${bar}:${beat}:${parseInt(sixteenth) > 2 ? 2 : 0}`,
          },
        });
      }

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
