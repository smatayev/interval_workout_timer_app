import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { calculateProgress } from '../utils/timerEngine';

function ProgressBar({ totalIntervals, currentInterval, isResting }) {
  const percentage = calculateProgress({ currentInterval, totalIntervals });

  return (
    <CircularProgressbar
      value={percentage}
      text={`${Math.round(percentage)}%`}
      styles={buildStyles({
        pathColor: isResting ? '#a8c6c7' : '#7ea88d',
        trailColor: '#f2e9dc',
        textColor: '#3f3428',
        textSize: '20px',
        pathTransitionDuration: 0.4,
      })}
    />
  );
}

export default ProgressBar;
