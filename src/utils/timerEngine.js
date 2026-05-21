/**
 * Pure timer domain functions — no React, no side effects.
 * All timing behavior flows through here so it can be unit-tested
 * and reused independently of the UI layer.
 */

/** Convert a { minutes, seconds } duration object to total seconds. */
export function toSeconds({ minutes, seconds }) {
  return minutes * 60 + seconds;
}

/** Format a total-seconds value as "m:ss". */
export function formatTime(totalSeconds) {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

/**
 * Given the current timer phase, return the next state.
 *
 * @param {object} params
 * @param {boolean} params.isResting        - true when in a rest phase
 * @param {number}  params.currentInterval  - 1-based current interval index
 * @param {number}  params.totalIntervals
 * @returns {{ isResting: boolean, currentInterval: number, done: boolean }}
 */
export function getNextState({ isResting, currentInterval, totalIntervals }) {
  if (!isResting) {
    // Active interval just finished → move to rest
    return { isResting: true, currentInterval, done: false };
  }
  // Rest just finished → advance or complete
  if (currentInterval >= totalIntervals) {
    return { isResting: false, currentInterval: 1, done: true };
  }
  return { isResting: false, currentInterval: currentInterval + 1, done: false };
}

/**
 * Session-level progress as a 0–100 percentage (based on completed intervals).
 *
 * @param {object} params
 * @param {number} params.currentInterval
 * @param {number} params.totalIntervals
 * @returns {number}
 */
export function calculateProgress({ currentInterval, totalIntervals }) {
  if (totalIntervals === 0) { return 0; }
  return ((currentInterval - 1) / totalIntervals) * 100;
}
