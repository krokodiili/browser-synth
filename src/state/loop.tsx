import { createContext, useContext, useEffect, useReducer } from "react";
import { Time } from "tone/build/esm/core/type/Units";
import useMetronome from "../hooks/useMetronome";

type Dispatch = (action: Action) => void;

export interface LoopState {
  playing: boolean;
  recording: boolean;
  bpm: number;
  dispatch: Dispatch;
  notesRecorded: RecordedNote[];
}

export interface RecordedNote {
  note: string;
  time: Time;
  length: number;
}

export type Action =
  | { type: "CHANGE_BPM"; payload: number }
  | { type: "START_RECORDING" }
  | { type: "STOP_RECORDING" }
  | { type: "PLAY" }
  | { type: "STOP_PLAYING" }
  | {
      type: "RECORD_NOTE";
      payload: RecordedNote;
    }
  | {
      type: "CLEAR_LOOP";
    };

const initialState: LoopState = {
  bpm: 128,
  notesRecorded: [],
  dispatch: () => {},
  recording: false,
  playing: false,
};

const loopReducer = (state: LoopState, action: Action) => {
  switch (action.type) {
    case "CHANGE_BPM":
      return {
        ...state,
        bpm: action.payload,
      };
    case "START_RECORDING":
      return {
        ...state,
        recording: true,
        playing: true,
      };
    case "STOP_RECORDING":
      return {
        ...state,
        recording: false,
      };
    case "RECORD_NOTE":
      return {
        ...state,
        notesRecorded: [...state.notesRecorded, action.payload],
      };
    case "CLEAR_LOOP":
      return {
        ...state,
        notesRecorded: [],
      };
    case "PLAY":
      return {
        ...state,
        playing: true,
      };
    case "STOP_PLAYING":
      return {
        ...state,
        playing: false,
      };
    default:
      return state;
  }
};
const LoopContext = createContext<LoopState>(initialState);

const LoopProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(loopReducer, initialState);
  const { stopMetronome, startMetronome } = useMetronome();

  useEffect(() => {
    if (state.playing) {
      stopMetronome();
      startMetronome(state.bpm);
    } else {
      stopMetronome();
    }
  }, [state.playing, state.bpm, stopMetronome, startMetronome]);

  const value = {
    ...state,
    dispatch,
  };

  return <LoopContext.Provider value={value}>{children}</LoopContext.Provider>;
};

export default LoopProvider;

export const useLoop = () => {
  const context = useContext(LoopContext);
  if (context === undefined) {
    throw new Error("LoopProvider not found");
  }

  return context;
};
