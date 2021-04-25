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
  const [startTime, setStartTime] = useState(Date.now());
  const [startBeat, setStartBeat] = useState("");

  useKeypress([keyForNote], (event) => {
    if (!pressed) {
      if (recording) {
        setStartTime(Date.now());

        const [bar, beat, sixteenth] = Tone.Transport.position
          .toString()
          .split(":");

        const adjustedStartBeat = `${bar}:${beat}:${sixteenth.substring(0, 3)}`;
        setStartBeat(adjustedStartBeat);
      }

      setPressed(true);
      synth.triggerAttack(note);
    }
  });

  const handleRelease = useCallback(
    (event) => {
      if (event.key === keyForNote) {
        if (recording) {
          const holdTime = ((Date.now() - startTime) / 1000).toFixed(2);

          dispatch({
            type: "RECORD_NOTE",
            payload: {
              note,
              time: startBeat,
              length: parseFloat(holdTime),
            },
          });
        }

        setStartTime(0);
        setPressed(false);
        synth.triggerRelease(note);
      }
    },
    [keyForNote, recording, synth, note, startTime, dispatch, startBeat]
  );

  useEffect(() => {
    document.body.addEventListener("keyup", handleRelease);

    return () => {
      document.body.removeEventListener("keyup", handleRelease);
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
