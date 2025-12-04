import React, { createContext, useContext, useEffect, useReducer, useRef } from "react";
import * as Tone from "tone";
import { useLoop } from "../LoopingSection/loopState";

// Import samples using Vite's glob import
const kickFiles = import.meta.glob('/src/assets/drums/kick/*', { query: '?url', import: 'default', eager: true });
const snareFiles = import.meta.glob('/src/assets/drums/snare/*', { query: '?url', import: 'default', eager: true });
const clapFiles = import.meta.glob('/src/assets/drums/clap/*', { query: '?url', import: 'default', eager: true });
const hihatOpenFiles = import.meta.glob('/src/assets/drums/hihat-open/*', { query: '?url', import: 'default', eager: true });
const hihatClosedFiles = import.meta.glob('/src/assets/drums/hihat-closed/*', { query: '?url', import: 'default', eager: true });

const getSamples = (globResult: Record<string, unknown>) => {
    const entries = Object.entries(globResult).map(([k, v]) => [k, v as string]);
    return Object.fromEntries(entries);
};

const SAMPLE_MAPS = [
    { name: "Kick", samples: getSamples(kickFiles) },
    { name: "Snare", samples: getSamples(snareFiles) },
    { name: "Clap", samples: getSamples(clapFiles) },
    { name: "HiHat Open", samples: getSamples(hihatOpenFiles) },
    { name: "HiHat Closed", samples: getSamples(hihatClosedFiles) },
];

interface TrackState {
    name: string;
    steps: boolean[];
    sampleKey: string; // The path (key in samples map)
    volume: number;
    muted: boolean;
}

interface DrumMachineState {
    tracks: TrackState[];
    currentStep: number;
    swing: number;
}

type Action =
    | { type: "TOGGLE_STEP"; trackIndex: number; stepIndex: number }
    | { type: "SET_CURRENT_STEP"; step: number }
    | { type: "CHANGE_SAMPLE"; trackIndex: number; sampleKey: string }
    | { type: "SET_SWING"; payload: number }
    | { type: "CLEAR_PATTERN" };

const STEPS = 16;

const initialState: DrumMachineState = {
    tracks: SAMPLE_MAPS.map((map) => ({
        name: map.name,
        steps: Array(STEPS).fill(false),
        sampleKey: Object.keys(map.samples)[0] || "",
        volume: 0,
        muted: false,
    })),
    currentStep: 0,
    swing: 0,
};

const drumReducer = (state: DrumMachineState, action: Action): DrumMachineState => {
    switch (action.type) {
        case "TOGGLE_STEP":
            return {
                ...state,
                tracks: state.tracks.map((track, i) =>
                    i === action.trackIndex
                        ? {
                            ...track,
                            steps: track.steps.map((s, j) =>
                                j === action.stepIndex ? !s : s
                            ),
                        }
                        : track
                ),
            };
        case "SET_CURRENT_STEP":
            return {
                ...state,
                currentStep: action.step,
            };
        case "CHANGE_SAMPLE":
            return {
                ...state,
                tracks: state.tracks.map((track, i) =>
                    i === action.trackIndex
                        ? { ...track, sampleKey: action.sampleKey }
                        : track
                ),
            };
        case "SET_SWING":
            return {
                ...state,
                swing: action.payload,
            };
        case "CLEAR_PATTERN":
            return {
                ...state,
                tracks: state.tracks.map((track) => ({
                    ...track,
                    steps: Array(STEPS).fill(false),
                })),
            };
        default:
            return state;
    }
};

interface DrumMachineContextType extends DrumMachineState {
    dispatch: React.Dispatch<Action>;
    availableSamples: typeof SAMPLE_MAPS;
}

const DrumMachineContext = createContext<DrumMachineContextType | undefined>(undefined);

export const DrumMachineProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(drumReducer, initialState);
    const { playing } = useLoop();
    const playersRef = useRef<Tone.Player[]>([]);
    const stateRef = useRef(state); // Ref to access latest state in sequence callback

    useEffect(() => {
        stateRef.current = state;
    }, [state]);

    // Update swing
    useEffect(() => {
        Tone.Transport.swing = state.swing;
        Tone.Transport.swingSubdivision = "16n";
    }, [state.swing]);

    // Initialize players
    useEffect(() => {
        // Create players for each track
        const newPlayers = SAMPLE_MAPS.map((map, i) => {
             // Default to first sample if available
            const url = Object.values(map.samples)[0];
            if (url) {
                return new Tone.Player(url).toDestination();
            }
            return new Tone.Player().toDestination(); // Empty player
        });
        playersRef.current = newPlayers;

        return () => {
            newPlayers.forEach(p => p.dispose());
        };
    }, []);

    // Update samples when changed
    useEffect(() => {
        state.tracks.forEach((track, i) => {
            const player = playersRef.current[i];
            if (player && track.sampleKey) {
                const url = SAMPLE_MAPS[i].samples[track.sampleKey];
                 // Avoid reloading if it's the same buffer (Tone.Player doesn't expose current url easily, but we can check state)
                 // Actually Tone.Player.load() is async.
                 // We can just load it.
                 // Optimization: only load if changed?
                 // For now, let's just assume load is cheap for these small files or Tone handles caching.
                 // But wait, we don't want to reload every render.
                 // We should only reload if the sampleKey CHANGED.
                 // But this effect runs on every state change (because of state dependency).
                 // Better to listen to specific changes?
                 // Or just trust Tone.js?
                 // Let's rely on the fact that we can't easily check what's loaded.
                 // Actually, we can compare with previous state if we had it.
                 // But let's keep it simple: just load.
                 // However, reloading on every step change is BAD.
            }
        });
    }, [state.tracks]); // This will trigger on step toggle too. We need to be careful.

    // Better approach for sample loading:
    useEffect(() => {
        state.tracks.forEach((track, i) => {
             const url = SAMPLE_MAPS[i].samples[track.sampleKey];
             const player = playersRef.current[i];
             if (player && url) {
                 // Check if we need to load?
                 // Tone.Player doesn't allow easy URL check.
                 // We can store loadedUrl in the player object (monkey patch) or separate ref.
                 // Or we can use a separate useEffect for each track's sampleKey? No, rules of hooks.
                 // Let's use a ref to store loaded keys.
             }
        });
    }, [state.tracks]); // Still triggers on step change.

    // Use a Ref to track loaded samples to avoid reloading
    const loadedSamplesRef = useRef<string[]>(Array(SAMPLE_MAPS.length).fill(""));
    useEffect(() => {
        state.tracks.forEach((track, i) => {
            const url = SAMPLE_MAPS[i].samples[track.sampleKey];
            if (url && loadedSamplesRef.current[i] !== url) {
                const player = playersRef.current[i];
                if (player) {
                    player.load(url).then(() => {
                        console.log(`Loaded ${track.name}: ${url}`);
                    });
                    loadedSamplesRef.current[i] = url;
                }
            }
        });
    }, [state.tracks]);


    // Sequence Logic
    useEffect(() => {
        const seq = new Tone.Sequence(
            (time, step) => {
                dispatch({ type: "SET_CURRENT_STEP", step });

                // Read latest state from ref
                const currentTracks = stateRef.current.tracks;

                currentTracks.forEach((track, i) => {
                    if (track.steps[step] && !track.muted) {
                        const player = playersRef.current[i];
                        if (player && player.loaded) {
                            player.start(time);
                        }
                    }
                });
            },
            [...Array(STEPS).keys()], // [0, 1, ... 15]
            "16n" // 16th notes
        );

        if (playing) {
             // Sync with transport? Transport is started by LoopProvider.
             // We just start the sequence.
             seq.start(0);
        } else {
            seq.stop();
        }

        return () => {
            seq.dispose();
        };
    }, [playing]);

    return (
        <DrumMachineContext.Provider value={{ ...state, dispatch, availableSamples: SAMPLE_MAPS }}>
            {children}
        </DrumMachineContext.Provider>
    );
};

export const useDrumMachine = () => {
    const context = useContext(DrumMachineContext);
    if (!context) throw new Error("useDrumMachine must be used within DrumMachineProvider");
    return context;
};
