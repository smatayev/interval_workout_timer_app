import React, { useState, useEffect } from 'react';
import { configService } from '../services/configService';
import SpinnerInput from './SpinnerInput';

function Settings({
  intervalDuration,
  setIntervalDuration,
  restDuration,
  setRestDuration,
  totalIntervals,
  setTotalIntervals,
}) {
  const [savedConfigs, setSavedConfigs] = useState([]);

  useEffect(() => {
    setSavedConfigs(configService.getAll());
  }, []);

  const handleSave = () => {
    const updated = configService.save({ intervalDuration, restDuration, totalIntervals });
    setSavedConfigs(updated);
  };

  const handleLoad = (config) => {
    setIntervalDuration(config.intervalDuration);
    setRestDuration(config.restDuration);
    setTotalIntervals(config.totalIntervals);
  };

  return (
    <section className="card">
      <h3>Settings</h3>

      <div className="settings-group">
        <span className="settings-group-label">Interval Time</span>
        <div className="spinner-row">
          <SpinnerInput
            id="interval-min"
            value={intervalDuration.minutes}
            onChange={(v) => setIntervalDuration((prev) => ({ ...prev, minutes: v }))}
            min={0}
            max={30}
            step={1}
            label="min"
          />
          <SpinnerInput
            id="interval-sec"
            value={intervalDuration.seconds}
            onChange={(v) => setIntervalDuration((prev) => ({ ...prev, seconds: v }))}
            min={0}
            max={55}
            step={5}
            label="sec"
          />
        </div>
      </div>

      <div className="settings-group">
        <span className="settings-group-label">Rest Time</span>
        <div className="spinner-row">
          <SpinnerInput
            id="rest-min"
            value={restDuration.minutes}
            onChange={(v) => setRestDuration((prev) => ({ ...prev, minutes: v }))}
            min={0}
            max={10}
            step={1}
            label="min"
          />
          <SpinnerInput
            id="rest-sec"
            value={restDuration.seconds}
            onChange={(v) => setRestDuration((prev) => ({ ...prev, seconds: v }))}
            min={0}
            max={55}
            step={5}
            label="sec"
          />
        </div>
      </div>

      <div className="settings-group">
        <span className="settings-group-label">Total Intervals</span>
        <div className="settings-inline-row">
          <div className="spinner-row spinner-row--single">
            <SpinnerInput
              id="total-intervals"
              value={totalIntervals}
              onChange={(v) => setTotalIntervals(v)}
              min={1}
              max={10}
              step={1}
              label="rounds"
            />
          </div>
          <button
            type="button"
            onClick={handleSave}
            className="btn btn--secondary settings-save-btn"
          >
            Save configuration
          </button>
        </div>
      </div>

      {savedConfigs.length > 0 && (
        <div className="settings-actions">
          <div className="saved-configs">
            {savedConfigs.map((config, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleLoad(config)}
                className="saved-config-chip"
              >
                {config.intervalDuration.minutes}m {config.intervalDuration.seconds}s ·{' '}
                {config.restDuration.minutes}m {config.restDuration.seconds}s ·{' '}
                {config.totalIntervals}×
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default Settings;
