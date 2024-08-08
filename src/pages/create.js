import { getExercises } from '../db/db.js';

export async function renderCreate() {
  return `
    <h2>Create new workout</h2>
    <main>
      <create-workout-form>
        <form method="POST" action="/create">
          <label>
            Name
            <input name="name" size="16" required />
          </label>
          ${await renderCreateWorkoutSet()}
          <div>
            <button type="button" id="add-set-btn">Add set</button>
            <button>Submit</button>
          </div>
        </form>
      </create-workout-form>
    </main>
  `;
}

async function renderCreateWorkoutSet() {
  return `
    <create-workout-set set-id="1">
      <fieldset>
        <legend></legend>
        ${await renderCreateSetExercise()}
        <div>
          <button type="button" class="add-exercise-btn">Add exercise</button>
          <button type="button" class="copy-set-btn">Copy set</button>
          <button type="button" class="delete-set-btn">Delete set</button>
        </div>
      </fieldset>
    </create-workout-set>
  `;
}

async function renderCreateSetExercise() {
  const result = await getExercises();
  const exercises = result.rows;

  return `
    <create-set-exercise set-id="1" exercise-id="1">
      <label></label>
      <div>
        <select>
          ${exercises
            .map((exercise) => `
              <option value="${exercise.exercise_id}">
                ${exercise.exercise_category} - level ${exercise.exercise_level} - ${exercise.exercise_name}
              </option>
             `)
            .join('')}
        </select>
        <button type="button" delete-exercise-btn>Delete exercise</button>
      </div>
    </create-set-exercise>
  `; 
}

/**
 * @param {URLSearchParams} data
 */
export function postWorkout(data) {
  console.log(data.toString());
}
