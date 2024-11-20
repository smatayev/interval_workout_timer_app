// src/App.js
import React, { useState, useEffect, useCallback } from 'react';
import Settings from './components/Settings';
import Timer from './components/Timer';
import Controls from './components/Controls';
import ProgressBar from './components/ProgressBar';
import './App.css';

function App() {
  const [intervalDuration, setIntervalDuration] = useState({ minutes: 1, seconds: 0 });
  const [restDuration, setRestDuration] = useState({ minutes: 0, seconds: 30 });
  const [totalIntervals, setTotalIntervals] = useState(3);
  const [currentInterval, setCurrentInterval] = useState(1);
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(intervalDuration.minutes * 60 + intervalDuration.seconds);
  const [isResting, setIsResting] = useState(false);
  const [countdown, setCountdown] = useState(3);

  // Update timeLeft whenever the intervalDuration changes and the timer is not running
  useEffect(() => {
    if (!isRunning) {
      setTimeLeft(intervalDuration.minutes * 60 + intervalDuration.seconds);
    }
  }, [intervalDuration, isRunning]);

  // Update timeLeft whenever the restDuration changes and the timer is not running and in a rest state
  useEffect(() => {
    if (!isRunning && isResting) {
      setTimeLeft(restDuration.minutes * 60 + restDuration.seconds);
    }
  }, [restDuration, isRunning, isResting]);

  const handleIntervalComplete = useCallback(() => {
    if (!isResting) {
      setIsResting(true);
      setTimeLeft(restDuration.minutes * 60 + restDuration.seconds);
    } else {
      setCurrentInterval((prev) => prev + 1);
      if (currentInterval >= totalIntervals) {
        // End of session
        setIsRunning(false);
        setCountdown(3);
        setCurrentInterval(1);
        setIsResting(false);
        setTimeLeft(intervalDuration.minutes * 60 + intervalDuration.seconds);
      } else {
        setIsResting(false);
        setTimeLeft(intervalDuration.minutes * 60 + intervalDuration.seconds);
      }
    }
  }, [isResting, restDuration, currentInterval, totalIntervals, intervalDuration]);

  useEffect(() => {
    if (isRunning) {
      if (countdown > 0) {
        const countdownTimer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
        return () => clearTimeout(countdownTimer);
      } else {
        const timer = setInterval(() => {
          setTimeLeft((prevTime) => {
            if (prevTime <= 1) {
              clearInterval(timer);
              handleIntervalComplete();
              return 0;
            }
            return prevTime - 1;
          });
        }, 1000);
        return () => clearInterval(timer);
      }
    }
  }, [isRunning, countdown, handleIntervalComplete]);

  return (
    <div className="app-container">
      <h1>Interval Timer</h1>
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
                intervalDuration={intervalDuration}
                restDuration={restDuration}
              />
            </div>
          </div>

          <div className="controls-container">
            <Controls
              isRunning={isRunning}
              setIsRunning={setIsRunning}
              setTimeLeft={setTimeLeft}
              intervalDuration={intervalDuration}
              restDuration={restDuration}
              setCurrentInterval={setCurrentInterval}
              setIsResting={setIsResting}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
