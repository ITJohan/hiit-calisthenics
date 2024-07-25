import * as db from '../db/db.js';

export async function renderCreate() {
  const result = await db.query('SELECT * FROM Exercises');
  const exercises = result.rows;

  return `
    <h2>Create new workout</h2>
    <main>
      <create-form>
        <form method="POST" action="/create">
          <label>
            Name
            <input name="name" size="16" required />
          </label>
          <label>
            Exercise
            <select name="exercise">
              ${exercises
                .map((exercise) => `<option value="${exercise.exercise_id}">${exercise.exercise_name}</option>`)
                .join('')}
            </select>
          </label>
          <button>Submit</button>
        </form>
      </create-form>
    </main>
  `;
}

/**
 * @param {URLSearchParams} data
 */
export function postWorkout(data) {
  console.log(data.toString());
}
