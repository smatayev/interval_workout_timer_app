import React from 'react';

function Controls({ isRunning, isPaused, onStartPause, onStop }) {
  const primaryLabel = isRunning ? (isPaused ? 'Continue' : 'Pause') : 'Start';

  return (
    <div className="controls-row">
      <button
        type="button"
        onClick={onStartPause}
        className="btn btn--primary btn--block"
      >
        {primaryLabel}
      </button>
      <button
        type="button"
        onClick={onStop}
        className="btn btn--danger btn--block"
        disabled={!isRunning}
      >
        Stop
      </button>
    </div>
  );
}

export default Controls;
