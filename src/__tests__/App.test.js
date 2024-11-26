import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

test('renders Interval Timer heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Interval Timer/i);
  expect(headingElement).toBeInTheDocument();
});

test('renders Settings component', () => {
  render(<App />);
  const settingsElement = screen.getByText(/Settings/i);
  expect(settingsElement).toBeInTheDocument();
});

test('starts countdown on start button click', () => {
  render(<App />);
  const startButton = screen.getByText(/Start/i);
  fireEvent.click(startButton);
  const countdownElement = screen.getByText(/Starting in/i);
  expect(countdownElement).toBeInTheDocument();
});

// test('pauses timer on pause button click', () => {
//   render(<App />);
//   const startButton = screen.getByText(/Start/i);
//   fireEvent.click(startButton);
//   const pauseButton = screen.getByText(/Pause/i);
//   fireEvent.click(pauseButton);
//   const pauseText = screen.getByText(/Paused/i);
//   expect(pauseText).toBeInTheDocument();
// });