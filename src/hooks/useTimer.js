import { useState, useEffect, useCallback } from 'react';
import { toSeconds, getNextState } from '../utils/timerEngine';
import { DEFAULTS } from '../config/defaults';

/**
 * Custom hook that owns all timer runtime state and side effects.
 * App.js (and any future shell component) delegates entirely to this hook.
 *
 * @param {object} config
 * @param {{ minutes: number, seconds: number }} config.intervalDuration
 * @param {{ minutes: number, seconds: number }} config.restDuration
 * @param {number} config.totalIntervals
 */
export function useTimer({ intervalDuration, restDuration, totalIntervals }) {
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isResting, setIsResting] = useState(false);
  const [currentInterval, setCurrentInterval] = useState(1);
  const [timeLeft, setTimeLeft] = useState(toSeconds(intervalDuration));
  const [countdown, setCountdown] = useState(DEFAULTS.COUNTDOWN_SECONDS);

  // Keep timeLeft in sync with config changes while the timer is idle
  useEffect(() => {
    if (!isRunning) {
      setTimeLeft(toSeconds(isResting ? restDuration : intervalDuration));
    }
  }, [intervalDuration, restDuration, isRunning, isResting]);

  const handlePhaseComplete = useCallback(() => {
    const next = getNextState({ isResting, currentInterval, totalIntervals });
    if (next.done) {
      setIsRunning(false);
      setIsPaused(false);
      setIsResting(false);
      setCurrentInterval(1);
      setCountdown(DEFAULTS.COUNTDOWN_SECONDS);
      setTimeLeft(toSeconds(intervalDuration));
    } else {
      setIsResting(next.isResting);
      setCurrentInterval(next.currentInterval);
      setTimeLeft(toSeconds(next.isResting ? restDuration : intervalDuration));
    }
  }, [isResting, currentInterval, totalIntervals, intervalDuration, restDuration]);

  // Countdown before the first interval
  useEffect(() => {
    if (!isRunning || isPaused || countdown <= 0) { return; }
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [isRunning, isPaused, countdown]);

  // Main per-second decrement during active / rest phases
  useEffect(() => {
    if (!isRunning || isPaused || countdown > 0) { return; }
    const t = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(t);
          handlePhaseComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [isRunning, isPaused, countdown, handlePhaseComplete]);

  const start = useCallback(() => {
    setIsRunning(true);
    setIsPaused(false);
    setIsResting(false);
    setCurrentInterval(1);
    setCountdown(DEFAULTS.COUNTDOWN_SECONDS);
    setTimeLeft(toSeconds(intervalDuration));
  }, [intervalDuration]);

  const togglePause = useCallback(() => {
    if (!isRunning) { return; }
    setIsPaused(p => !p);
  }, [isRunning]);

  const stop = useCallback(() => {
    setIsRunning(false);
    setIsPaused(false);
    setIsResting(false);
    setCurrentInterval(1);
    setCountdown(DEFAULTS.COUNTDOWN_SECONDS);
    setTimeLeft(toSeconds(intervalDuration));
  }, [intervalDuration]);

  return {
    isRunning,
    isPaused,
    isResting,
    currentInterval,
    timeLeft,
    countdown,
    start,
    togglePause,
    stop,
  };
}
