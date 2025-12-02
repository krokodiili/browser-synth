import React from 'react';
import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import Knobs from './index';
import { useSynth } from '../../state/synth';

// Mock the useSynth hook
vi.mock('../../state/synth', () => ({
  useSynth: vi.fn(),
}));

// Mock the Knob component
vi.mock('./Knob', () => ({
  default: ({ label, value, onChange }) => (
    <div data-testid="knob-mock">
      <span data-testid="knob-label">{label}</span>
      <span data-testid="knob-value">{value}</span>
      <input
        data-testid="knob-input"
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={value}
        onChange={(e) => {
             onChange(parseFloat(e.target.value));
        }}
      />
    </div>
  ),
}));

describe('Knobs Component', () => {
  const mockDispatch = vi.fn();
  const mockSynth = {
    volume: { value: 0 },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    useSynth.mockReturnValue({
      synth: mockSynth,
      volume: 0,
      dispatch: mockDispatch,
    });
  });

  afterEach(() => {
    cleanup();
  });

  it('renders correctly', () => {
    render(<Knobs />);
    expect(screen.getByTestId('knob-label').textContent).toBe('Volume');
  });

  it('calculates the correct initial knob value from volume state (0dB -> 1)', () => {
    useSynth.mockReturnValue({
      synth: mockSynth,
      volume: 0,
      dispatch: mockDispatch,
    });
    render(<Knobs />);
    expect(screen.getByTestId('knob-value').textContent).toBe('1');
  });

  it('calculates the correct knob value for minimum volume (-60dB -> 0)', () => {
    useSynth.mockReturnValue({
      synth: mockSynth,
      volume: -60,
      dispatch: mockDispatch,
    });
    render(<Knobs />);
    expect(screen.getByTestId('knob-value').textContent).toBe('0');
  });

  it('calculates the correct knob value for mid volume (-30dB -> 0.5)', () => {
    useSynth.mockReturnValue({
      synth: mockSynth,
      volume: -30,
      dispatch: mockDispatch,
    });
    render(<Knobs />);
    expect(screen.getByTestId('knob-value').textContent).toBe('0.5');
  });

  it('dispatches the correct volume when knob changes (1 -> 0dB)', () => {
    // Start with min volume so that setting to max triggers a change
    useSynth.mockReturnValue({
      synth: mockSynth,
      volume: -60,
      dispatch: mockDispatch,
    });
    render(<Knobs />);
    const input = screen.getByTestId('knob-input');

    // Simulate setting knob to max (1)
    fireEvent.change(input, { target: { value: '1' } });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'CHANGE_VOLUME',
      payload: 0,
    });
  });

  it('dispatches the correct volume when knob changes (0 -> -60dB)', () => {
    // Start with max volume so that setting to min triggers a change
    useSynth.mockReturnValue({
      synth: mockSynth,
      volume: 0,
      dispatch: mockDispatch,
    });
    render(<Knobs />);
    const input = screen.getByTestId('knob-input');

    // Simulate setting knob to min (0)
    fireEvent.change(input, { target: { value: '0' } });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'CHANGE_VOLUME',
      payload: -60,
    });
  });

  it('dispatches the correct volume when knob changes (0.5 -> -30dB)', () => {
    render(<Knobs />);
    const input = screen.getByTestId('knob-input');

    // Simulate setting knob to mid (0.5)
    fireEvent.change(input, { target: { value: '0.5' } });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'CHANGE_VOLUME',
      payload: -30,
    });
  });
});
