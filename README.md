# qwertySynth

A browser-based synthesizer and drum machine built with React, TypeScript, and Tone.js.

## Features

- **Polyphonic Synthesizer**: 4-track polyphonic synth with adjustable octave, volume, and effects (Chorus, Delay, Reverb).
- **Drum Machine**: Step sequencer with multiple tracks (Kick, Snare, Clap, HiHat Open/Closed) and swing control.
- **Loop Station**: Record and playback notes with quantization and metronome.
- **Effects**: Global effects chain including Chorus, Feedback Delay, and Reverb.
- **Visuals**: Dark hardware-inspired UI with LED indicators and custom knobs.

## Tech Stack

- **React**: UI library (v18).
- **TypeScript**: Static typing.
- **Tone.js**: Web Audio API framework for synthesis and timing.
- **Vite**: Build tool and development server.
- **Styled Components**: CSS-in-JS for styling.
- **Vitest**: Testing framework.

## Project Structure

The project is organized by feature:

- `src/components/Synth/`: Synthesizer components and state (`synthState.tsx`).
- `src/components/DrumMachine/`: Drum machine components and state (`drumMachineState.tsx`).
- `src/components/LoopingSection/`: Looping and recording components and state (`loopState.tsx`).
- `src/components/MasterBoard/`: Global controls (Metronome).
- `src/hooks/`: Custom hooks (e.g., `useMetronome`).

## Getting Started

### Prerequisites

- Node.js
- pnpm

### Installation

```bash
pnpm install
```

### Development

Start the development server:

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

- **Synth**: Use the on-screen keys or your computer keyboard to play notes. Select tracks to switch between different synth instances.
- **Drum Machine**: Click on the grid steps to toggle drum hits. Adjust swing with the slider.
- **Looping**: Press "Record" (Circle button) to start recording notes. Press "Play" (Triangle button) to playback. Quantization can be adjusted with the "Magnet" knob.
- **Knobs**: Drag knobs vertically to adjust parameters.

## License

MIT
