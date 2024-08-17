export function renderWorkout(/** @type {Exercise[]} */ exercises) {
  return `
    <h2>Workout</h2>
    <main>
      <workout-form>
        <form method="POST" action="/workout">
          ${exercises.map((exercise, index) => `
            <fieldset>
              <legend>${index + 1} - ${exercise.exercise_name}</legend>
              <label><input type="radio" name="reps-exercise-${exercise.exercise_id}" value="0" required /> 0</label>
              <label><input type="radio" name="reps-exercise-${exercise.exercise_id}" value="1" required /> 1</label>
              <label><input type="radio" name="reps-exercise-${exercise.exercise_id}" value="2" required /> 2</label>
              <label><input type="radio" name="reps-exercise-${exercise.exercise_id}" value="3" required /> 3</label>
              <label><input type="radio" name="reps-exercise-${exercise.exercise_id}" value="4" required /> 4</label>
              <label><input type="radio" name="reps-exercise-${exercise.exercise_id}" value="5" required /> 5</label>
              <label><input type="radio" name="reps-exercise-${exercise.exercise_id}" value="6" required /> 6</label>
              <label><input type="radio" name="reps-exercise-${exercise.exercise_id}" value="7" required /> 7</label>
              <label><input type="radio" name="reps-exercise-${exercise.exercise_id}" value="8" required /> 8</label>
              <label><input type="radio" name="reps-exercise-${exercise.exercise_id}" value="9" required /> 9</label>
              <label><input type="radio" name="reps-exercise-${exercise.exercise_id}" value="10" required /> 10</label>
            </fieldset>
          `).join('')}
          <button>Finish</button>
        </form>
      <workout-form>
    </main>
  `;
}
