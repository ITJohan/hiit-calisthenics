export function renderCreate() {
  return `
    <h2>Create new workout</h2>
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
