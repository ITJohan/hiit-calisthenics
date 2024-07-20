export function renderWorkout() {
  return `
    <h2>Workout</h2>
    <main>
      <form method="POST" action="/workout">
        <label for="name">Name</label>
        <input id="name" name="name" />
        <button>Submit</button>
      </form>
    </main>
  `;
}

/**
 * @param {URLSearchParams} data
 */
export function postWorkout(data) {
  console.log(data.toString());
}
