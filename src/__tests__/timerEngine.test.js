import { toSeconds, formatTime, getNextState, calculateProgress } from '../utils/timerEngine';

describe('toSeconds', () => {
  test('converts minutes and seconds to total seconds', () => {
    expect(toSeconds({ minutes: 1, seconds: 30 })).toBe(90);
    expect(toSeconds({ minutes: 2, seconds: 0 })).toBe(120);
    expect(toSeconds({ minutes: 0, seconds: 45 })).toBe(45);
  });

  test('returns 0 for zero duration', () => {
    expect(toSeconds({ minutes: 0, seconds: 0 })).toBe(0);
  });
});

describe('formatTime', () => {
  test('pads single-digit seconds with a leading zero', () => {
    expect(formatTime(9)).toBe('0:09');
    expect(formatTime(61)).toBe('1:01');
  });

  test('does not pad two-digit seconds', () => {
    expect(formatTime(90)).toBe('1:30');
    expect(formatTime(600)).toBe('10:00');
  });

  test('formats zero as 0:00', () => {
    expect(formatTime(0)).toBe('0:00');
  });
});

describe('getNextState', () => {
  test('active interval transitions to rest', () => {
    const result = getNextState({ isResting: false, currentInterval: 1, totalIntervals: 3 });
    expect(result).toEqual({ isResting: true, currentInterval: 1, done: false });
  });

  test('rest phase advances to the next interval', () => {
    const result = getNextState({ isResting: true, currentInterval: 1, totalIntervals: 3 });
    expect(result).toEqual({ isResting: false, currentInterval: 2, done: false });
  });

  test('last rest phase marks the session as done', () => {
    const result = getNextState({ isResting: true, currentInterval: 3, totalIntervals: 3 });
    expect(result).toEqual({ isResting: false, currentInterval: 1, done: true });
  });

  test('single-interval session completes after the first rest', () => {
    const result = getNextState({ isResting: true, currentInterval: 1, totalIntervals: 1 });
    expect(result).toEqual({ isResting: false, currentInterval: 1, done: true });
  });
});

describe('calculateProgress', () => {
  test('returns 0 at the start of the first interval', () => {
    expect(calculateProgress({ currentInterval: 1, totalIntervals: 4 })).toBe(0);
  });

  test('returns the correct percentage mid-session', () => {
    expect(calculateProgress({ currentInterval: 3, totalIntervals: 4 })).toBe(50);
  });

  test('returns 0 when totalIntervals is 0 to avoid division by zero', () => {
    expect(calculateProgress({ currentInterval: 1, totalIntervals: 0 })).toBe(0);
  });
});
