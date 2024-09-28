import workouts from "../../../data/workouts.json";
import WorkoutQuery from "./workoutType";

// Get all workouts
export const getAllWorkouts = () => {
  return workouts;
};

// Get all tags from workouts
export const getTags = () => {
  const allTags = new Set(workouts.flatMap((workout) => workout.tags));
  return Array.from(allTags);
};

// Filter workouts based on the query parameters
export const filterWorkouts = (query: WorkoutQuery) => {
  let filteredWorkouts = [...workouts];

  // Filter by tag
  if (query.tags) {
    const queryTags = Array.isArray(query.tags) ? query.tags : query.tags.split(',');

    filteredWorkouts = filteredWorkouts.filter((workout) =>
      queryTags.every((tag) => workout.tags.includes(tag))
    );
  }

  // Filter by searchName
  if (query.searchName) {
    const searchName = query.searchName as string;
    filteredWorkouts = filteredWorkouts.filter((workout) =>
      workout.name.toLowerCase().includes(searchName.toLowerCase())
    );
  }

  // Filter by duration
  if (query.duration) {
    const duration = parseInt(query.duration as string);
    filteredWorkouts = filteredWorkouts.filter(
      (workout) => workout.durationMins === duration
    );
  }

  // Filter by durationMin and durationMax
  if (query.durationMin || query.durationMax) {
    const min = query.durationMin ? parseInt(query.durationMin) : 0;
    const max = query.durationMax ? parseInt(query.durationMax) : Infinity;

    filteredWorkouts = filteredWorkouts.filter(
      (workout) => workout.durationMins >= min && workout.durationMins <= max
    );
  }

  return filteredWorkouts;
};

// Get a single workout by its ID
export const getWorkoutById = (id: string) => {
  return workouts.find((workout) => workout.id === id);
};
