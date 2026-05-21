import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { calculateProgress } from '../utils/timerEngine';

function ProgressBar({ totalIntervals, currentInterval, isResting }) {
  const percentage = calculateProgress({ currentInterval, totalIntervals });

  return (
    <div style={{ width: 100, height: 100, margin: 'auto' }}>
      <CircularProgressbar
        value={percentage}
        text={`${Math.round(percentage)}%`}
        styles={buildStyles({
          pathColor: isResting ? 'azure' : 'cerulean',
          trailColor: 'navy',
          textSize: '15px',
        })}
      />
    </div>
  );
}

export default ProgressBar;
