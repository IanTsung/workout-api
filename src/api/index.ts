import { Router } from "express";
import workoutRoutes from "./components/workouts";
import aiRoutes from "./components/ai";

// Create a root router to combine all feature routes
const rootRouter = Router();

rootRouter.use("/", workoutRoutes);
rootRouter.use("/ai", aiRoutes);

export default rootRouter;