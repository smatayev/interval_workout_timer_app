// src/components/Timer.js
import React from 'react';
import { formatTime } from '../utils/timeUtils';

function Timer({ timeLeft, isResting, currentInterval, totalIntervals }) {
  return (
    <div className={`timer-container ${isResting ? 'resting' : 'active'}`}>
      <h2>{isResting ? 'Resting' : `Interval ${currentInterval} of ${totalIntervals}`}</h2>
      <p>{formatTime(timeLeft)}</p>
    </div>
  );
}

export default Timer;
