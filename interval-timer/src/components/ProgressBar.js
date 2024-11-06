// src/components/ProgressBar.js
import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function ProgressBar({ totalIntervals, currentInterval, isResting, intervalDuration, restDuration }) {
  const totalSessionTime =
    totalIntervals * (intervalDuration.minutes * 60 + intervalDuration.seconds + restDuration.minutes * 60 + restDuration.seconds);
  const completedTime =
    (currentInterval - 1) * (intervalDuration.minutes * 60 + intervalDuration.seconds + restDuration.minutes * 60 + restDuration.seconds);
  const percentage = (completedTime / totalSessionTime) * 100;

  return (
    <div style={{ width: 150, height: 150, margin: 'auto' }}>
      <CircularProgressbar
        value={percentage}
        text={`${Math.round(percentage)}%`}
        styles={buildStyles({
          pathColor: isResting ? 'azure' : 'cerulean',
          trailColor: 'navy',
        })}
      />
    </div>
  );
}

export default ProgressBar;
