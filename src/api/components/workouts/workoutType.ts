export default interface WorkoutQuery {
  tags?: string | string[];
  searchName?: string;
  duration?: string;
  durationMin?: string;
  durationMax?: string;
}
