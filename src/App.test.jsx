import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { vi, describe, it, expect } from 'vitest';

vi.mock('tone', async () => {
  const originalTone = await vi.importActual('tone');
  return {
    ...originalTone,
    PolySynth: vi.fn(function () {
      return {
        toDestination: vi.fn().mockReturnThis(),
        triggerAttack: vi.fn(),
        triggerRelease: vi.fn(),
        connect: vi.fn(),
        set: vi.fn(),
        volume: { value: 0 },
      };
    }),
    Reverb: vi.fn(function () {
      return {
        toDestination: vi.fn().mockReturnThis(),
        decay: 0,
      };
    }),
    Player: vi.fn(function () {
      return {
        toDestination: vi.fn().mockReturnThis(),
        start: vi.fn(),
        load: vi.fn().mockResolvedValue(undefined),
        loaded: true,
        dispose: vi.fn(),
      };
    }),
    Loop: vi.fn(function (callback, interval) {
      return {
        start: vi.fn(),
        stop: vi.fn(),
      };
    }),
    Part: vi.fn(function (callback, notes) {
      return {
        start: vi.fn(),
        stop: vi.fn(),
      };
    }),
    Transport: {
      ...originalTone.Transport,
      position: '0:0:0',
      bpm: { value: 120 },
      start: vi.fn(),
      stop: vi.fn(),
      cancel: vi.fn(),
      context: {
        lookAhead: 0,
      }
    },
    Sequence: vi.fn(function (callback, events, subdivision) {
      return {
        start: vi.fn(),
        stop: vi.fn(),
        dispose: vi.fn(),
      };
    }),
    MembraneSynth: vi.fn(function () {
      return {
        toDestination: vi.fn().mockReturnThis(),
        triggerAttackRelease: vi.fn(),
        volume: { value: 0 },
      };
    }),
    start: vi.fn(),
  };
});

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
  });
});
