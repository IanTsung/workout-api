import { Router } from "express";
import { generateWorkoutDescriptionHandler, generateBodyPartTagsHandler, naturalQueryHandler, generateWorkoutHandler } from "./aiController";

const router = Router();

// Define all AI-based routes
router.get("/generate-description/:workoutId", generateWorkoutDescriptionHandler);
router.get("/generate-body-parts/:workoutId", generateBodyPartTagsHandler);
router.get("/natural-query", naturalQueryHandler);
router.post("/generate-workout", generateWorkoutHandler);

export default router;
