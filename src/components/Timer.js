import React from 'react';
import { formatTime } from '../utils/timerEngine';
import ProgressBar from './ProgressBar';

function Timer({ timeLeft, isResting, isRunning, currentInterval, totalIntervals }) {
  const phaseClass = isResting ? 'is-resting' : isRunning ? 'is-active' : '';
  const phaseLabel = isResting
    ? 'Resting'
    : isRunning
      ? `Interval ${currentInterval} of ${totalIntervals}`
      : 'Ready';

  return (
    <section className={`timer-card ${phaseClass}`.trim()} aria-live="polite">
      <div className="timer-stack">
        <span className="timer-phase">{phaseLabel}</span>
        <p className="timer-display">{formatTime(timeLeft)}</p>
      </div>
      <div className="timer-progress">
        <ProgressBar
          totalIntervals={totalIntervals}
          currentInterval={currentInterval}
          isResting={isResting}
        />
      </div>
    </section>
  );
}

export default Timer;
