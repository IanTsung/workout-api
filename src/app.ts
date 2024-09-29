import express from "express";
import cors from "cors";
import apiRoutes from "./api";
import dotenv from "dotenv";
import { throttle } from './middleware/throttle';  // Import throttle middleware

dotenv.config({ path: '.env' });

const app = express();

app.use(cors());
app.use(express.json());

// Use throttle middleware to handle potential overloading issue
app.use(throttle);

app.use("/api", apiRoutes);

export default app;