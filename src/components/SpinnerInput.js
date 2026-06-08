import React, { useState } from 'react';

/**
 * SpinnerInput — a +/– stepper control with an optional direct text entry.
 *
 * Props
 *   value    {number}   controlled value
 *   onChange {Function} called with the new clamped/snapped number
 *   min      {number}
 *   max      {number}
 *   step     {number}
 *   label    {string}   unit label shown below the control (e.g. "min", "sec")
 *   id       {string}   base id for the inner input
 */
function SpinnerInput({ value, onChange, min, max, step, label, id }) {
  const [inputValue, setInputValue] = useState('');
  const [editing, setEditing] = useState(false);

  const snapToStep = (raw) => {
    const clamped = Math.min(max, Math.max(min, raw));
    const snapped = Math.round(clamped / step) * step;
    return Math.min(max, Math.max(min, snapped));
  };

  const decrement = () => {
    const next = Math.max(min, value - step);
    onChange(next);
  };

  const increment = () => {
    const next = Math.min(max, value + step);
    onChange(next);
  };

  const handleFocus = () => {
    setEditing(true);
    setInputValue(String(value));
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleBlur = () => {
    setEditing(false);
    const parsed = parseInt(inputValue, 10);
    if (!isNaN(parsed)) {
      onChange(snapToStep(parsed));
    }
    setInputValue('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.target.blur();
    }
    if (e.key === 'Escape') {
      setEditing(false);
      setInputValue('');
    }
  };

  const atMin = value <= min;
  const atMax = value >= max;

  return (
    <div className="spinner-item">
      <div className="spinner-control">
        <button
          type="button"
          className="spinner-btn"
          onClick={decrement}
          disabled={atMin}
          aria-label={`Decrease ${label}`}
          tabIndex={0}
        >
          –
        </button>

        {editing ? (
          <input
            id={id}
            type="number"
            className="spinner-value spinner-value--input"
            value={inputValue}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            aria-label={label}
            autoFocus
          />
        ) : (
          <span
            className="spinner-value"
            role="spinbutton"
            aria-valuenow={value}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-label={label}
            aria-live="polite"
            tabIndex={0}
            onClick={handleFocus}
            onFocus={handleFocus}
          >
            {String(value).padStart(2, '0')}
          </span>
        )}

        <button
          type="button"
          className="spinner-btn"
          onClick={increment}
          disabled={atMax}
          aria-label={`Increase ${label}`}
          tabIndex={0}
        >
          +
        </button>
      </div>
      <span className="spinner-label">{label}</span>
    </div>
  );
}

export default SpinnerInput;
