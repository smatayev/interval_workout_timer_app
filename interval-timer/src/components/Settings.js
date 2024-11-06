// src/components/Settings.js
import React from 'react';

function Settings({
  intervalDuration,
  setIntervalDuration,
  restDuration,
  setRestDuration,
  totalIntervals,
  setTotalIntervals,
}) {
  const handleInputChange = (setter) => (e) => {
    const { name, value } = e.target;
    setter((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="settings-container">
      <h3>Settings</h3>
      <div>
        <label>Interval Duration: </label>
        <input
          type="number"
          name="minutes"
          value={intervalDuration.minutes}
          onChange={handleInputChange(setIntervalDuration)}
          min="0"
        />{' '}
        min
        <input
          type="number"
          name="seconds"
          value={intervalDuration.seconds}
          onChange={handleInputChange(setIntervalDuration)}
          min="0"
        />{' '}
        sec
      </div>
      <div>
        <label>Rest Duration: </label>
        <input
          type="number"
          name="minutes"
          value={restDuration.minutes}
          onChange={handleInputChange(setRestDuration)}
          min="0"
        />{' '}
        min
        <input
          type="number"
          name="seconds"
          value={restDuration.seconds}
          onChange={handleInputChange(setRestDuration)}
          min="0"
        />{' '}
        sec
      </div>
      <div>
        <label>Total Intervals: </label>
        <input
          type="number"
          value={totalIntervals}
          onChange={(e) => setTotalIntervals(parseInt(e.target.value))}
          min="1"
        />
      </div>
    </div>
  );
}

export default Settings;
