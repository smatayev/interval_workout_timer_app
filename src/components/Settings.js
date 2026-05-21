import React, { useState, useEffect } from 'react';
import { configService } from '../services/configService';

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

  const renderDurationFields = (id, value, setter) => (
    <div className="settings-fields">
      <div className="settings-field">
        <input
          id={`${id}-min`}
          type="number"
          min="0"
          value={value.minutes}
          onChange={(e) =>
            setter((prev) => ({ ...prev, minutes: parseInt(e.target.value, 10) || 0 }))
          }
          className="settings-input"
          aria-label={`${id} minutes`}
        />
        <span className="settings-unit">min</span>
      </div>
      <div className="settings-field">
        <input
          id={`${id}-sec`}
          type="number"
          min="0"
          value={value.seconds}
          onChange={(e) =>
            setter((prev) => ({ ...prev, seconds: parseInt(e.target.value, 10) || 0 }))
          }
          className="settings-input"
          aria-label={`${id} seconds`}
        />
        <span className="settings-unit">sec</span>
      </div>
    </div>
  );

  return (
    <section className="card">
      <h3>Settings</h3>

      <div className="settings-group">
        <label htmlFor="interval-min">Interval duration</label>
        {renderDurationFields('interval', intervalDuration, setIntervalDuration)}
      </div>

      <div className="settings-group">
        <label htmlFor="rest-min">Rest duration</label>
        {renderDurationFields('rest', restDuration, setRestDuration)}
      </div>

      <div className="settings-group">
        <label htmlFor="total-intervals">Total intervals</label>
        <div className="settings-fields settings-fields--single">
          <div className="settings-field">
            <input
              id="total-intervals"
              type="number"
              min="1"
              value={totalIntervals}
              onChange={(e) => setTotalIntervals(parseInt(e.target.value, 10) || 0)}
              className="settings-input"
              aria-label="Total intervals"
            />
            <span className="settings-unit">rounds</span>
          </div>
        </div>
      </div>

      <div className="settings-actions">
        <button
          type="button"
          onClick={handleSave}
          className="btn btn--secondary btn--block"
        >
          Save configuration
        </button>
        {savedConfigs.length > 0 && (
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
        )}
      </div>
    </section>
  );
}

export default Settings;
