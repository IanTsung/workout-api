import { Request, Response } from "express";
import {
  getAllWorkouts,
  filterWorkouts,
  getWorkoutById,
  getTags,
} from "./workoutService";
import WorkoutQuery from "./workoutType";

export const listTags = (req: Request, res: Response): void => {
  const tags = getTags();
  res.json(tags);
};

export const getWorkouts = (req: Request, res: Response): void => {
  const { tags, searchName, duration, durationMin, durationMax } = req.query as Partial<WorkoutQuery>;

  if (!tags && !searchName && !duration && !durationMin && !durationMax) {
    // If no query params are provided, return all workouts
    const workouts = getAllWorkouts();
    res.json(workouts);
    return;
  }

  const workouts = filterWorkouts({
    tags,
    searchName,
    duration,
    durationMin,
    durationMax,
  });
  res.json(workouts);
};

export const getWorkout = (req: Request, res: Response): void => {
  const { workoutId } = req.params;
  const workout = getWorkoutById(workoutId);

  if (!workout) {
    res.status(404).json({ message: "Workout not found" });
    return;
  }

  res.json(workout);
};
