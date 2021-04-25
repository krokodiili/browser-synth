import React, { useEffect } from "react";
import { RecordedNote, useSynth } from "../state/synth";
import * as Tone from "tone";

const DebugPanel = () => {
  const { synth, playing, notesRecorded } = useSynth();
  useEffect(() => {
    const part = new Tone.Part((time: any, value: RecordedNote) => {
      synth.triggerAttackRelease(value.note, value.length, time);
    }, notesRecorded).start();
    return () => {
      part.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing]);
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {notesRecorded.map((data) => (
        <div key={data.time.toString() + data.note}>
          {data.note} {data.time} {data.length}
        </div>
      ))}
    </div>
  );
};

export default DebugPanel;
