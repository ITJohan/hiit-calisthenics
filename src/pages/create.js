import * as db from '../db/db.js';

export async function renderCreate() {
  return `
    ${await renderCreateWorkoutSetTemplate()}
    ${await renderCreateSetExerciseTemplate()}
    <h2>Create new workout</h2>
    <main>
      <create-workout-form>
        <form method="POST" action="/create">
          <label>
            Name
            <input name="name" size="16" required />
          </label>
          <div>
            <button type="button" id="add-set-btn">Add set</button>
            <button>Submit</button>
          </div>
        </form>
      </create-workout-form>
    </main>
  `;
}

async function renderCreateWorkoutSetTemplate() {
  return `
    <template id="create-workout-set-template">
      <create-workout-set>
        <fieldset>
          <legend></legend>
          <div>
            <button type="button" class="add-exercise-btn">Add exercise</button>
            <button type="button" class="copy-set-btn">Copy set</button>
            <button type="button" class="delete-set-btn">Delete set</button>
          </div>
        </fieldset>
      </create-workout-set>
    </template>
  `;
}

async function renderCreateSetExerciseTemplate() {
  const result = await db.query('SELECT * FROM Exercises');
  const exercises = result.rows;

  return `
    <template id="create-set-exercise-template">
      <create-set-exercise>
        <label></label>
        <select>
          ${exercises
            .map((exercise) => `<option value="${exercise.exercise_id}">${exercise.exercise_name}</option>`)
            .join('')}
        </select>
      </create-set-exercise>
    </template>
  `; 
}

/**
 * @param {URLSearchParams} data
 */
export function postWorkout(data) {
  console.log(data.toString());
}
