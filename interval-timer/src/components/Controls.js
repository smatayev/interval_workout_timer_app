import React from 'react';

function Controls({
  isRunning,
  isPaused,
  setIsRunning,
  setIsPaused,
  setTimeLeft,
  intervalDuration,
  restDuration,
  setCurrentInterval,
  setIsResting,
}) {
  const handleStartPause = () => {
    if (isRunning) {
      setIsPaused((prev) => !prev); // Toggle pause state
    } else {
      setIsRunning(true); // Start the timer
      setIsPaused(false); // Ensure pause state is reset when starting
    }
  };

  const handleStop = () => {
    setIsRunning(false);
    setIsPaused(false); // Reset pause state
    setTimeLeft(intervalDuration.minutes * 60 + intervalDuration.seconds);
    setCurrentInterval(1);
    setIsResting(false);
  };

  return (
    <div className="controls-container">
      <button onClick={handleStartPause} className="control-button">
        {isRunning ? (isPaused ? 'Continue' : 'Pause') : 'Start'}
      </button>
      <button onClick={handleStop} className="control-button stop-button">
        Stop
      </button>
    </div>
  );
}

export default Controls;
