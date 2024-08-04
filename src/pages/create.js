import * as db from '../db/db.js';

export async function renderCreate() {
  return `
    <h2>Create new workout</h2>
    <main>
      <create-form>
        <form method="POST" action="/create">
          <label>
            Name
            <input name="name" size="16" required />
          </label>
          ${await renderCreateSet()}
          <div>
            <button type="button" id="add-set-btn">Add set</button>
            <button>Submit</button>
          </div>
        </form>
      </create-form>
    </main>
  `;
}

async function renderCreateSet() {
  const result = await db.query('SELECT * FROM Exercises');
  const exercises = result.rows;

  return `
    <create-set>
      <fieldset>
        <legend>Set 1</legend>
        <div class="exercise-container">
          <label for="set-1-exercise-1">Exercise 1</label>
          <select id="set-1-exercise-1" name="set-1-exercise-1">
            ${exercises
              .map((exercise) => `<option value="${exercise.exercise_id}">${exercise.exercise_name}</option>`)
              .join('')}
          </select>
        </div>
        <div>
          <button type="button" class="add-exercise-btn">Add exercise</button>
          <button type="button" class="copy-set-btn">Copy set</button>
          <button type="button" class="delete-set-btn">Delete set</button>
        </div>
      </fieldset>
    </create-set>
  `;
}

/**
 * @param {URLSearchParams} data
 */
export function postWorkout(data) {
  console.log(data.toString());
}
