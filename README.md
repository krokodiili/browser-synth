# qwertySynth

A browser-based synthesizer and drum machine built with React, TypeScript, and Tone.js.

## Features

- **Polyphonic Synthesizer**: 4-track polyphonic synth with adjustable octave, volume, and effects (Chorus, Delay, Reverb).
- **Drum Machine**: Step sequencer with multiple tracks (Kick, Snare, Clap, HiHat Open/Closed) and swing control.
- **Loop Station**: Record and playback notes with quantization and metronome.
- **Song Manager**: Save and Load your songs (compositions) using the LCD-style Song Manager.
- **Effects**: Global effects chain including Chorus, Feedback Delay, and Reverb.
- **Visuals**: Dark hardware-inspired UI with LED indicators and custom knobs.

## Tech Stack

- **React**: UI library (v18).
- **TypeScript**: Static typing.
- **Tone.js**: Web Audio API framework for synthesis and timing.
- **Vite**: Build tool and development server.
- **Styled Components**: CSS-in-JS for styling.
- **Vitest**: Testing framework.
- **Node.js & Express**: Backend API for song persistence.
- **SQLite**: Lightweight database for storing songs.

## Project Structure

The project is organized by feature:

- `src/components/Synth/`: Synthesizer components and state (`synthState.tsx`).
- `src/components/DrumMachine/`: Drum machine components and state (`drumMachineState.tsx`).
- `src/components/LoopingSection/`: Looping and recording components and state (`loopState.tsx`).
- `src/components/SongManager/`: UI for saving and loading songs.
- `src/components/MasterBoard/`: Global controls (Metronome).
- `src/hooks/`: Custom hooks (e.g., `useMetronome`).
- `server/`: Node.js Express server and SQLite database setup.

## Getting Started

### Prerequisites

- Node.js
- pnpm

### Installation

```bash
pnpm install
```

### Development

To run the application, you need to start both the backend server and the frontend client.

1. **Start the Backend Server** (runs on port 3001):
   ```bash
   pnpm run server
   ```

2. **Start the Frontend Client** (in a new terminal):
   ```bash
   pnpm dev
   ```

Open [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal) to view it in the browser.

### Testing

Run unit tests:

```bash
pnpm test
```

## Usage

- **Song Manager**: Enter a name and press "SAVE" to persist your current synth, drum, and loop settings. Press "LOAD" to view saved songs and click one to restore it.
- **Synth**: Use the on-screen keys or your computer keyboard to play notes. Select tracks to switch between different synth instances.
- **Drum Machine**: Click on the grid steps to toggle drum hits. Adjust swing with the slider.
- **Looping**: Press "Record" (Circle button) to start recording notes. Press "Play" (Triangle button) to playback. Quantization can be adjusted with the "Magnet" knob.
- **Knobs**: Drag knobs vertically to adjust parameters.

## License

MIT
