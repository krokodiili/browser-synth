import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import RubberButton from "../RubberButton";
import { useSynth } from "../Synth/synthState";
import { useDrumMachine } from "../DrumMachine/drumMachineState";
import { useLoop } from "../LoopingSection/loopState";

interface Song {
  id: number;
  name: string;
  data: string; // JSON string
}

const SongManager: React.FC = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mode, setMode] = useState<"BROWSE" | "NAMING" | "LOADING">("BROWSE");
  const [tempName, setTempName] = useState("New Song");

  // Hooks for accessing and dispatching state
  const synthState = useSynth();
  const drumState = useDrumMachine();
  const loopState = useLoop();

  // Fetch songs on mount
  const fetchSongs = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:3001/songs");
      const data = await res.json();
      if (data.message === "success") {
        setSongs(data.data);
      }
    } catch (e) {
      console.error("Failed to fetch songs", e);
    }
  }, []);

  useEffect(() => {
    fetchSongs();
  }, [fetchSongs]);

  // Keyboard input for naming
  // We attach a listener only when in NAMING mode to avoid conflict
  useEffect(() => {
    if (mode !== "NAMING") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Backspace") {
        setTempName((prev) => prev.slice(0, -1));
      } else if (e.key.length === 1 && /[a-zA-Z0-9\s]/.test(e.key)) {
        setTempName((prev) => prev + e.key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mode]);

  const handleUp = () => {
    if (mode === "BROWSE") {
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
    }
  };

  const handleDown = () => {
    if (mode === "BROWSE") {
      setSelectedIndex((prev) => (prev < songs.length - 1 ? prev + 1 : songs.length - 1));
    }
  };

  const handleSave = async () => {
    if (mode === "BROWSE") {
      setMode("NAMING");
      setTempName("New Song");
    } else if (mode === "NAMING") {
      // Collect state
      const fullState = {
        synth: {
          tracks: synthState.tracks.map(t => ({ id: t.id, octave: t.octave, volume: t.volume })),
          reverb: synthState.reverb,
          delay: synthState.delay,
          chorus: synthState.chorus
        },
        drumMachine: {
          tracks: drumState.tracks,
          swing: drumState.swing
        },
        loop: {
          bpm: loopState.bpm,
          notes: loopState.notesRecorded
        }
      };

      try {
        await fetch("http://localhost:3001/songs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: tempName, data: JSON.stringify(fullState) })
        });
        await fetchSongs();
        setMode("BROWSE");
      } catch (e) {
        console.error("Save failed", e);
      }
    }
  };

  const handleLoad = async () => {
    if (mode === "BROWSE" && songs[selectedIndex]) {
      setMode("LOADING");
      try {
        const res = await fetch(`http://localhost:3001/songs/${songs[selectedIndex].id}`);
        const data = await res.json();

        if (data.message === "success") {
          const songData = JSON.parse(data.data.data);

          // Dispatch Actions
          synthState.dispatch({ type: "LOAD_SETTINGS", payload: songData.synth });
          drumState.dispatch({ type: "LOAD_PATTERN", payload: songData.drumMachine });
          loopState.dispatch({ type: "LOAD_SONG", payload: songData.loop });

          // Start Playback
          // We need a slight delay or ensure state is updated.
          // But actions are synchronous in React state updates usually queue.
          // However, playing depends on loopState.playing.
          setTimeout(() => {
             loopState.dispatch({ type: "PLAY" });
          }, 100);
        }
      } catch (e) {
        console.error("Load failed", e);
      } finally {
        setMode("BROWSE");
      }
    }
  };

  return (
    <Container>
      <Header>SONG MANAGER</Header>
      <Screen>
        {mode === "NAMING" ? (
          <Line>{tempName}_</Line>
        ) : songs.length === 0 ? (
            <Line>NO SONGS FOUND</Line>
        ) : (
          <List>
             {/* Show window of songs around selected index? For now just simple list or current item */}
             {/* Let's show just current item for simplicity of 1-line LCD or multiple lines */}
             {songs.map((song, i) => (
               <ListItem key={song.id} $active={i === selectedIndex} ref={el => {
                 // Scroll into view logic could go here
                 if (i === selectedIndex && el) {
                    el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
                 }
               }}>
                 {i === selectedIndex ? "> " : "  "}{song.name}
               </ListItem>
             ))}
          </List>
        )}
      </Screen>
      <Controls>
        <ButtonGroup>
          <NavButton onClick={handleUp}>▲</NavButton>
          <NavButton onClick={handleDown}>▼</NavButton>
        </ButtonGroup>
        <ActionButton onClick={handleLoad} disabled={mode === "NAMING"}>LOAD</ActionButton>
        <ActionButton onClick={handleSave} $active={mode === "NAMING"}>
            {mode === "NAMING" ? "CONFIRM" : "SAVE"}
        </ActionButton>
      </Controls>
    </Container>
  );
};

export default SongManager;

const Container = styled.div`
  background: #222;
  padding: 15px;
  border-radius: 8px;
  border-bottom: 4px solid #000;
  box-shadow: inset 0 1px 1px rgba(255,255,255,0.1), 0 10px 20px rgba(0,0,0,0.5);
  width: 200px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 250px;
`;

const Header = styled.div`
  font-family: 'Courier New', monospace;
  font-size: 0.8rem;
  color: #888;
  font-weight: bold;
  text-align: center;
  border-bottom: 1px solid #333;
  padding-bottom: 5px;
`;

const Screen = styled.div`
  background: #2b3a28;
  height: 100px;
  border-radius: 4px;
  box-shadow: inset 0 2px 5px rgba(0,0,0,0.8);
  padding: 5px;
  overflow: hidden;
  font-family: 'Courier New', monospace;
  color: #4bd83a;
  text-shadow: 0 0 2px #4bd83a;
  display: flex;
  flex-direction: column;
`;

const Line = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const List = styled.div`
    overflow-y: auto;
    height: 100%;
    /* Hide scrollbar */
    &::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
`;

const ListItem = styled.div<{ $active: boolean }>`
    background: ${props => props.$active ? "rgba(75, 216, 58, 0.2)" : "transparent"};
    white-space: nowrap;
    cursor: pointer;
`;

const Controls = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ButtonGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

const NavButton = styled(RubberButton)`
    width: 30px;
    height: 25px;
    font-size: 0.6rem;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ActionButton = styled(RubberButton)<{ $active?: boolean }>`
    height: 55px;
    width: 50px;
    font-size: 0.6rem;
    background-color: ${props => props.$active ? "#a33" : "#383838"};
    color: ${props => props.$active ? "#fff" : "#aaa"};
`;
