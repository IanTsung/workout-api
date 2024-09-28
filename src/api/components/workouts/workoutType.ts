// Interface for the structure of the workout query params
export default interface WorkoutQuery {
  tags?: string | string[];
  searchName?: string;
  duration?: string;
  durationMin?: string;
  durationMax?: string;
}
