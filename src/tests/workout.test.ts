import request from 'supertest';
import app from '../app';

type Workout = {
  id: string;
  name: string;
  durationMins: number;
  tags: string[];
  steps: string[];
};

describe('Workout API Endpoints', () => {
  let server: any;
  const PORT = 4000;

  beforeAll((done) => {
    server = app.listen(PORT, () => {
      console.log(`Test server running on port ${PORT}`);
      done();
    });
  });

  afterAll((done) => {
    server.close(done);
  });

  it('should return all available tags', async () => {
    const res = await request(server).get('/api/list-tags');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should return all workouts when no query parameters are provided', async () => {
    const res = await request(app).get('/api/workouts');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should filter workouts by tag', async () => {
    const res = await request(server).get('/api/workouts?tag=arms');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
    res.body.forEach((workout: Workout) => {
      expect(workout.tags).toContain('arms');
    });
  });

  it('should filter workouts by name containing search parameter', async () => {
    const res = await request(server).get('/api/workouts?searchName=cardio');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
    res.body.forEach((workout: Workout) => {
      expect(workout.name.toLowerCase()).toContain('cardio');
    });
  });

  it('should filter workouts by duration range', async () => {
    const res = await request(server).get('/api/workouts?durationMin=10&durationMax=45');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
    res.body.forEach((workout: Workout) => {
      expect(workout.durationMins).toBeGreaterThanOrEqual(10);
      expect(workout.durationMins).toBeLessThanOrEqual(45);
    });
  });

  it('should filter workouts by exact duration', async () => {
    const res = await request(server).get('/api/workouts?duration=45');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
    res.body.forEach((workout: Workout) => {
      expect(workout.durationMins).toBe(45);
    });
  });

  it('should return a specific workout by ID', async () => {
    const validWorkoutId = '767163bd-85bb-46ab-9995-b1e8d176c7b5';
    const res = await request(app).get(`/api/workout/${validWorkoutId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', validWorkoutId);
    expect(res.body).toHaveProperty('name');
  });

  it('should return 404 for invalid workout ID', async () => {
    const res = await request(app).get('/api/workout/1');
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('message', 'Workout not found');
  });
});
