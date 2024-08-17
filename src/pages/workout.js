export function renderWorkout(/** @type {Exercise[]} */ exercises) {
  return `
    <h2>Workout</h2>
    <main>
      <ul>
      ${exercises.map(exercise => `
        <li>${exercise.exercise_id}, ${exercise.exercise_name}, ${exercise.exercise_level}, ${exercise.exercise_category}</li>
      `).join('')}
      </ul>
    </main>
  `;
}
