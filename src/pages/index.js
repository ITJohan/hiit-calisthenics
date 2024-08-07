import { getWorkouts } from '../db/db.js';

export async function renderIndex() {
  const result = await getWorkouts();
  const workouts = result.rows;

  return `
    <h2>Welcome to CaliCircuit</h2>
    <main>
      <select name="workout">
        ${workouts.map((workout) => `<option value="${workout.workout_id}">${workout.workout_name}</option>`).join('')}
      </select>
      <a href="/workout">Start workout</a>
      <a href="/create">Create workout</a>
      <a href="/modify">Modify workout</a>
    </main>
  `;
}

