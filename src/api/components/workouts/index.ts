import { Router } from "express";
import { getWorkouts, getWorkout, listTags } from "./workoutController";

const router = Router();

// GET all tags
router.get("/list-tags", listTags);

// GET all workouts with query params filtering
router.get("/workouts", getWorkouts);

// GET workout by ID
router.get("/workout/:workoutId", getWorkout);

export default router;
