import fs from 'node:fs/promises';
import pg from 'pg';
const { Pool } = pg;

const password = await fs.readFile(process.env.PGPASSWORD, { encoding: 'utf8' });

const pool = new Pool({ 
  user: process.env.PGUSER,
  password: password,
  database: process.env.PGDATABASE,
  host: process.env.PGHOST
});

/** @returns {Promise<pg.QueryResult<Workout>>} */
export function getWorkouts() {
  return pool.query('SELECT * FROM Workouts');
}

/** @returns {Promise<pg.QueryResult<Exercise>>} */
export function getExercises() {
  return pool.query('SELECT * FROM Exercises');
}

/** @returns {Promise<pg.QueryResult<Pick<Exercise, "exercise_category">>>} */
export function getCategories() {
  return pool.query('SELECT * FROM Exercises');
}

