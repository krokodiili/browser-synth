import React, { useEffect } from "react";
import { useSynth } from "../state/synth";
import * as Tone from "tone";

const DebugPanel = () => {
  const { synth, recording, notesRecorded } = useSynth();
  useEffect(() => {
    const part = new Tone.Part(
      (time: any, note: any) => {
        synth.triggerAttackRelease(note, "8n", time);
      },
      notesRecorded.map((data) => [data.time, data.note])
    ).start();
    return () => {
      console.log(part);
      part.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recording]);
  return (
    <div style={{ display: "flex" }}>
      {notesRecorded.map((data) => (
        <div key={data.time.toString() + data.note}>
          {data.note} {data.time}{" "}
        </div>
      ))}
    </div>
  );
};

export default DebugPanel;
