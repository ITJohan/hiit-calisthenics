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
          <fieldset id="set-container">
            <legend>Set 1</legend>
            <label id="exercise-input">
              Exercise 1
              <select name="set-1-exercise-1">
                ${exercises
                  .map((exercise) => `<option value="${exercise.exercise_id}">${exercise.exercise_name}</option>`)
                  .join('')}
              </select>
            </label>
            <div>
              <button type="button" id="add-exercise-btn">Add exercise</button>
              <button type="button" id="copy-set-btn">Copy set</button>
            </div>
          </fieldset>
          <div>
            <button type="button" id="add-set-btn">Add set</button>
            <button>Submit</button>
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
