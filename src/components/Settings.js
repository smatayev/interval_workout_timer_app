// src/components/Settings.js
import React, { useState, useEffect } from 'react';

function Settings({
  intervalDuration,
  setIntervalDuration,
  restDuration,
  setRestDuration,
  totalIntervals,
  setTotalIntervals,
}) {
  const [savedConfigs, setSavedConfigs] = useState([]);

  // Load saved configurations from local storage on mount
  useEffect(() => {
    const configs = JSON.parse(localStorage.getItem('timerConfigs')) || [];
    setSavedConfigs(configs);
  }, []);

  // Save a new configuration
  const saveConfig = () => {
    const newConfig = { intervalDuration, restDuration, totalIntervals };
    let updatedConfigs = [newConfig, ...savedConfigs];

    // Keep only the last three configurations
    if (updatedConfigs.length > 3) {
      updatedConfigs = updatedConfigs.slice(0, 3);
    }

    setSavedConfigs(updatedConfigs);
    localStorage.setItem('timerConfigs', JSON.stringify(updatedConfigs));
  };

  // Load a saved configuration
  const loadConfig = (config) => {
    setIntervalDuration(config.intervalDuration);
    setRestDuration(config.restDuration);
    setTotalIntervals(config.totalIntervals);
  };

  return (
    <div className="settings-container">
      <h3>Settings</h3>
      <div className="settings-group">
        <label>Interval Duration: </label>
        <input
          type="number"
          name="minutes"
          value={intervalDuration.minutes}
          onChange={(e) =>
            setIntervalDuration((prev) => ({ ...prev, minutes: parseInt(e.target.value, 10) || 0 }))
          }
          min="0"
          className="settings-input"
        />{' '}
        min
        <input
          type="number"
          name="seconds"
          value={intervalDuration.seconds}
          onChange={(e) =>
            setIntervalDuration((prev) => ({ ...prev, seconds: parseInt(e.target.value, 10) || 0 }))
          }
          min="0"
          className="settings-input"
        />{' '}
        sec
      </div>
      <div className="settings-group">
        <label>Rest Duration: </label>
        <input
          type="number"
          name="minutes"
          value={restDuration.minutes}
          onChange={(e) =>
            setRestDuration((prev) => ({ ...prev, minutes: parseInt(e.target.value, 10) || 0 }))
          }
          min="0"
          className="settings-input"
        />{' '}
        min
        <input
          type="number"
          name="seconds"
          value={restDuration.seconds}
          onChange={(e) =>
            setRestDuration((prev) => ({ ...prev, seconds: parseInt(e.target.value, 10) || 0 }))
          }
          min="0"
          className="settings-input"
        />{' '}
        sec
      </div>
      <div className="settings-group">
        <label>Total Intervals: </label>
        <input
          type="number"
          value={totalIntervals}
          onChange={(e) => setTotalIntervals(parseInt(e.target.value, 10) || 0)}
          min="1"
          className="settings-input"
        />
      </div>
      <div className="settings-actions">
        <button onClick={saveConfig} className="settings-button">Save Configuration</button>
        <div className="saved-configs">
          {savedConfigs.map((config, index) => (
            <button
              key={index}
              onClick={() => loadConfig(config)}
              className="saved-config-button"
            >
              Config {index + 1}: {config.intervalDuration.minutes}m {config.intervalDuration.seconds}s / {config.restDuration.minutes}m {config.restDuration.seconds}s / {config.totalIntervals} intervals
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Settings;
