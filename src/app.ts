import express from "express";
import cors from "cors";
import apiRoutes from "./api";
import dotenv from "dotenv";

dotenv.config({ path: '.env' });

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", apiRoutes);

export default app;