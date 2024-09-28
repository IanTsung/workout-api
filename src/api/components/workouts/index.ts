import { Router } from "express";
import { listTagsHandler, getWorkoutsHandler, getWorkoutHandler } from "./workoutController";

const router = Router();

// GET all tags
router.get("/list-tags", listTagsHandler);

// GET all workouts with query params filtering
router.get("/workouts", getWorkoutsHandler);

// GET workout by ID
router.get("/workout/:workoutId", getWorkoutHandler);

export default router;
