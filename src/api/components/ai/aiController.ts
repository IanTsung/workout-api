import { Request, Response } from "express";
import { OpenAI, ClientOptions } from "openai";
import { getWorkoutById } from "../workouts/workoutService";

const openai_key = process.env.OPENAI_API_KEY as ClientOptions;
const openai = new OpenAI(openai_key);

export const generateWorkoutDescription = async (
  req: Request,
  res: Response
) => {
  const { workoutId } = req.params;

  const workout = getWorkoutById(workoutId);

  if (!workout) {
    return res.status(404).json({ error: "Workout not found" });
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
