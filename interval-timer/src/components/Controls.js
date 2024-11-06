// src/components/Controls.js
import React from 'react';

function Controls({
  isRunning,
  setIsRunning,
  setTimeLeft,
  intervalDuration,
  restDuration,
  setCurrentInterval,
  setIsResting,
}) {
  const handleStartPause = () => {
    setIsRunning((prev) => !prev);
  };

  const handleStop = () => {
    setIsRunning(false);
    setTimeLeft(intervalDuration.minutes * 60 + intervalDuration.seconds);
    setCurrentInterval(1);
    setIsResting(false);
  };

  return (
    <div className="controls-container">
      <button onClick={handleStartPause} className="control-button">
        {isRunning ? 'Pause' : 'Start'}
      </button>
      <button onClick={handleStop} className="control-button stop-button">
        Stop
      </button>
    </div>
  );
}

export default Controls;
