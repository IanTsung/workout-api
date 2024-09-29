import { Request, Response } from "express";
import { getAllWorkouts, filterWorkouts, getWorkoutById, getTags } from "./workoutService";
import WorkoutQuery from "./workoutType";

// Handler for fetching all available workout tags
export const listTagsHandler = (req: Request, res: Response): void => {
  const tags = getTags();
  res.json(tags);
};

// Handler for fetching workouts, with optional query param filters
export const getWorkoutsHandler = (req: Request, res: Response): void => {
  const query = req.query as Partial<WorkoutQuery>;
  const isEmptyQuery = Object.values(query).every(val => !val);

  if (isEmptyQuery) {
    // If no query params are provided, return all workouts
    const workouts = getAllWorkouts();
    res.json(workouts);
    return;
  }

  const workouts = filterWorkouts(query);
  res.json(workouts);
};

// Handler for fetching a specific workout by its ID
export const getWorkoutHandler = (req: Request, res: Response): void => {
  const { workoutId } = req.params;
  const workout = getWorkoutById(workoutId);

  if (!workout) {
    res.status(404).json({ message: "Workout not found" });
    return;
  }

  res.json(workout);
};
