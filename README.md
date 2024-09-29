# Workout API

A TypeScript-based Express server that serves workout data. This API allows users to retrieve and filter workout information based on their needs.

## Features
- Filter workouts by tag, name, or duration.
- Retrieve all available workout tags.
- Fetch a specific workout by ID.

## Installation
- Install dependencies:
```
npm install
```
- Start the server:
```
npm start
```
- Run tests:
```
npm test
```

## Folder Structure
```
.
├── src
│   ├── api
│   │   ├── components
│   │   │   ├── workouts
│   │   │   │   ├── workoutController.ts
│   │   │   │   ├── workoutService.ts
│   │   │   │   ├── workoutType.ts
│   │   │   │   ├── index.ts
│   │   │   ├── ai
│   │   │   │   ├── aiController.ts
│   │   │   │   ├── index.ts
│   │   └── index.ts
│   ├── data
│   │   └── workouts.json
│   ├── app.ts
│   └── server.ts
├── tests
│   └── workout.test.ts
└── README.md
```

## License
MIT License.
