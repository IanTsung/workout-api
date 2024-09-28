import { Request, Response } from "express";
import { OpenAI, ClientOptions } from "openai";
import { getWorkoutById, filterWorkouts } from "../workouts/workoutService";

const openai_key = process.env.OPENAI_API_KEY as ClientOptions;
const openai = new OpenAI(openai_key);

// Generate a detailed description of a workout based on its ID
export const generateWorkoutDescriptionHandler = async (req: Request, res: Response) => {
  const { workoutId } = req.params;
  const workout = getWorkoutById(workoutId);

  if (!workout) {
    res.status(404).json({ error: "Workout not found" });
    return;
  }

  try {
    const prompt = `Generate a detailed description for the workout called ${
      workout.name
    } which involves ${workout.steps.join(", ")}.`;

    const response = await openai.completions.create({
      prompt,
      model: "text-davinci-003",
      max_tokens: 100,
    });

    res.json({ description: response.choices[0].text });
  } catch (error) {
    res.status(500).json({ error: "Error generating workout description" });
  }
};

// Generate body part tags based on a workout's steps
export const generateBodyPartTagsHandler = async (req: Request, res: Response) => {
  const { workoutId } = req.params;
  const workout = getWorkoutById(workoutId);

  if (!workout) {
    res.status(404).json({ error: "Workout not found" });
    return;
  }

  try {
    const prompt = `Identify the body parts engaged in this workout: ${workout.steps.join(", ")}`;

    const response = await openai.completions.create({
      prompt,
      model: "text-davinci-003",
      max_tokens: 50,
    });

    res.json({ bodyParts: response.choices[0].text });
  } catch (error) {
    res.status(500).json({ error: "Error generating body part tags" });
  }
};

// Handle natural language queries for searching workouts
export const naturalQueryHandler = async (req: Request, res: Response) => {
  const { query } = req.query;

  if (!query) {
    res.status(400).json({ error: "Query parameter is required" });
    return;
  }

  try {
    const prompt = `Convert this query to workout search parameters: ${query}`;

    const response = await openai.completions.create({
      prompt,
      model: "text-davinci-003",
      max_tokens: 100,
    });

    const parsedParams = JSON.parse(response.choices[0].text);

    const workouts = filterWorkouts(parsedParams);

    res.json(workouts);
  } catch (error) {
    res.status(500).json({ error: "Error processing natural language query" });
  }
};

// Dynamically generate a workout based on user preferences
export const generateWorkoutHandler = async (req: Request, res: Response) => {
  const { preferences } = req.body;

  if (!preferences) {
    res.status(400).json({ error: "Preferences are required" });
    return;
  }

  try {
    const prompt = `Generate a workout based on these preferences: ${JSON.stringify(preferences)}`;

    const response = await openai.completions.create({
      prompt,
      model: "text-davinci-003",
      max_tokens: 200,
    });

    res.json({ workout: response.choices[0].text });
  } catch (error) {
    res.status(500).json({ error: "Error generating workout" });
  }
};
