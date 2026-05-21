import React from 'react';

function Controls({ isRunning, isPaused, onStartPause, onStop }) {
  return (
    <div className="controls-container">
      <button onClick={onStartPause} className="control-button">
        {isRunning ? (isPaused ? 'Continue' : 'Pause') : 'Start'}
      </button>
      <button onClick={onStop} className="control-button stop-button">
        Stop
      </button>
    </div>
  );
}

export default Controls;
