import { getWorkouts } from '../db/db.js';

export async function renderIndex() {
  const result = await getWorkouts();
  const workouts = result.rows;

  return `
    <h2>Welcome to CaliCircuit</h2>
    <main>
      <form action="/workout">
        <select name="id">
          ${workouts.map((workout) => `<option value="${workout.workout_id}">${workout.workout_name}</option>`).join('')}
        </select>
        <button>Start workout</button>
        <button>Modify workout</button>
      </form>
      <a href="/create">Create workout</a>
    </main>
  `;
}

