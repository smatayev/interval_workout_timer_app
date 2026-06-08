import React, { useState } from 'react';
import Settings from './components/Settings';
import Timer from './components/Timer';
import Controls from './components/Controls';
import { useTimer } from './hooks/useTimer';
import { DEFAULTS } from './config/defaults';
import './App.css';

function App() {
  const [intervalDuration, setIntervalDuration] = useState(DEFAULTS.INTERVAL_DURATION);
  const [restDuration, setRestDuration] = useState(DEFAULTS.REST_DURATION);
  const [totalIntervals, setTotalIntervals] = useState(DEFAULTS.TOTAL_INTERVALS);

  const {
    isRunning,
    isPaused,
    isResting,
    currentInterval,
    timeLeft,
    countdown,
    start,
    togglePause,
    stop,
  } = useTimer({ intervalDuration, restDuration, totalIntervals });

  return (
    <div className="app-container">
      <h1 className="app-title">Interval Timer</h1>
      {isRunning && countdown > 0 ? (
        <div className="countdown-overlay" role="status" aria-live="polite">
          <h2 className="countdown-text">Starting in {countdown}…</h2>
        </div>
      ) : (
        <>
          <Timer
            timeLeft={timeLeft}
            isResting={isResting}
            isRunning={isRunning}
            currentInterval={currentInterval}
            totalIntervals={totalIntervals}
          />
          <Settings
            intervalDuration={intervalDuration}
            setIntervalDuration={setIntervalDuration}
            restDuration={restDuration}
            setRestDuration={setRestDuration}
            totalIntervals={totalIntervals}
            setTotalIntervals={setTotalIntervals}
          />
          <Controls
            isRunning={isRunning}
            isPaused={isPaused}
            onStartPause={isRunning ? togglePause : start}
            onStop={stop}
          />
        </>
      )}
    </div>
  );
}

export default App;
