import React, { useState } from 'react';
import Settings from './components/Settings';
import Timer from './components/Timer';
import Controls from './components/Controls';
import ProgressBar from './components/ProgressBar';
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
      <h1>Interval Timer App</h1>
      {isRunning && countdown > 0 ? (
        <div className="countdown-overlay">
          <h2>Starting in {countdown}...</h2>
        </div>
      ) : (
        <>
          <div className="settings-container">
            <Settings
              intervalDuration={intervalDuration}
              setIntervalDuration={setIntervalDuration}
              restDuration={restDuration}
              setRestDuration={setRestDuration}
              totalIntervals={totalIntervals}
              setTotalIntervals={setTotalIntervals}
            />
          </div>
          <div className="timer-container">
            <Timer
              timeLeft={timeLeft}
              isResting={isResting}
              currentInterval={currentInterval}
              totalIntervals={totalIntervals}
            />
            <div style={{ width: '100px', height: '100px' }}>
              <ProgressBar
                totalIntervals={totalIntervals}
                currentInterval={currentInterval}
                isResting={isResting}
              />
            </div>
          </div>
          <div className="controls-container">
            <Controls
              isRunning={isRunning}
              isPaused={isPaused}
              onStartPause={isRunning ? togglePause : start}
              onStop={stop}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
