# Interval Timer App

This is a simple cross-platform interval timer application for workouts and other purposes. Users can:
- Set the duration of active intervals (in minutes and seconds)
- Set the length of rests between intervals
- Specify the total number of intervals
- Start the timer with a 3-second countdown

The app also saves the last three interval settings for quick reuse.

## Features
- Customizable interval length and rest length
- Adjustable number of intervals
- Countdown before starting
- Persistent storage of last three used settings
- Pause/Continue/Stop the timer

## How to Run
- *Launching soon*

## Technologies Used
- React
- Docker container
- GitHub Actions
- Azure VM
- ESLint
- Jest

## Deployment Process

### CI Pipeline:
- All pull requests targeting the main branch trigger the CI pipeline defined in ci.yml.
- The pipeline ensures code quality through linting (npm run lint) and runs tests (npm test).

### Build and Deployment:
When changes are merged into the main branch:
- The docker-build.yml workflow is triggered.
- A Docker image is built, tagged, and pushed to Docker Hub.
- The application is deployed to the Azure VM using Docker Compose.

### Docker Compose:
- The deployment uses docker-compose.yml to manage the application service.
- The configuration includes restart: always for resilience and dynamically sets the port from environment variables.