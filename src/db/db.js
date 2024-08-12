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
export async function getWorkouts() {
  return await pool.query('SELECT * FROM Workouts');
}

export async function postWorkout(/** @type {FormData} */ formData) {
  try {
    await  pool.query('BEGIN');
    let workoutId = '1';

    for (const [key, value] of formData) {
      if (key === 'name') {
        const res = await pool.query('INSERT INTO Workouts(workout_name, athlete_id) VALUES($1, $2) RETURNING workout_id', [value, 1])
        workoutId = res.rows[0].workout_id;
      } else {
        const [,setOrder,,exerciseOrder] = key.split('-');
        await pool.query('INSERT INTO WorkoutExercises(set_order, exercise_order, workout_id, exercise_id) VALUES($1, $2, $3, $4)', [setOrder, exerciseOrder, workoutId, value]);
      }
    }

    await pool.query('COMMIT');
  } catch (error) {
    await pool.query('ROLLBACK');
    throw new Error('Failed to post workout', {cause: error});
  }
}

/** @returns {Promise<pg.QueryResult<Exercise>>} */
export async function getExercises() {
  return await pool.query('SELECT * FROM Exercises');
}

/** @returns {Promise<pg.QueryResult<Pick<Exercise, "exercise_category">>>} */
export async function getCategories() {
  return await pool.query('SELECT DISTINCT exercise_category FROM Exercises');
}

