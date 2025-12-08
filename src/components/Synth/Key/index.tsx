import React, { useCallback, useEffect, useRef, useState } from "react";
import * as Tone from "tone";
import BlackKey from "./BlackKey";
import WhiteKey from "./WhiteKey";
import useKeypress from "react-use-keypress";
import { useSynth } from "../synthState";
import { useLoop } from "../../LoopingSection/loopState";

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
  const { synth, selectedTrackId } = useSynth();
  const { recording, dispatch } = useLoop();

  // Refs to capture context at the moment of attack
  const activeSynthRef = useRef<Tone.PolySynth | null>(null);
  const activeTrackIdRef = useRef<number>(selectedTrackId);

  const [startTime, setStartTime] = useState(Date.now());
  const [startBeat, setStartBeat] = useState("");

  useKeypress([keyForNote], async () => {
    if (!pressed) {
      await Tone.start();
      if (recording) {
        setStartTime(Date.now());

        const [bar, beat, sixteenth] = Tone.Transport.position
          .toString()
          .split(":");

        const adjustedStartBeat = `${bar}:${beat}:${sixteenth.substring(0, 3)}`;
        setStartBeat(adjustedStartBeat);
      }

      setPressed(true);

      // Capture the current synth and track ID to ensure correct release/recording
      activeSynthRef.current = synth;
      activeTrackIdRef.current = selectedTrackId;

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
              trackId: activeTrackIdRef.current, // Use the track ID where the note started
            },
          });
        }

        setStartTime(0);
        setPressed(false);

        // Release the synth that was triggered, or fallback to current
        const targetSynth = activeSynthRef.current || synth;
        targetSynth.triggerRelease(note);

        activeSynthRef.current = null;
      }
    },
    [keyForNote, recording, synth, note, startTime, dispatch, startBeat, selectedTrackId]
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
          $noMargin={noMargin}
          keyForNote={keyForNote}
        />
      ) : (
        <BlackKey pressed={pressed} keyForNote={keyForNote} />
      )}
    </>
  );
};

export default KeyContainer;
