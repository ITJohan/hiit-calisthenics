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
          <fieldset>
            <legend>Set 1</legend>
            <label>
              Exercise 1
              <select name="exercise">
                ${exercises
                  .map((exercise) => `<option value="${exercise.exercise_id}">${exercise.exercise_name}</option>`)
                  .join('')}
              </select>
            </label>
            <div>
              <button>Add exercise</button>
              <button>Copy set</button>
            </div>
          </fieldset>
          <div>
            <button>Add set</button>
            <button type="submit">Submit</button>
          </div>
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
