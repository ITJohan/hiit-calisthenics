import "./rr-set.js";

function template(/** @type {ProgressionSet[] | undefined} */ sets) {
	if (sets === undefined) {
		return `
      <div>Loading...</div>
    `;
	}
	return `
    <form>
      ${sets.map((set, index) => `<rr-set id="set-${index + 1}" exercise-id="${set.exerciseId}"></rr-set>`).join("")}
    </form>
  `;
}

customElements.define(
	"rr-workout",
	class RRWorkout extends HTMLElement {
		constructor() {
			super();
			this.setHTMLUnsafe(template());
		}

		async connectedCallback() {
			const workoutsRes = await fetch("./data/workouts.json");
			const progressionsRes = await fetch("./data/progressions.json");
			const exercisesRes = await fetch("./data/exercises.json");
			/** @type {Workout[]} */
			const allWorkouts = await workoutsRes.json();
			/** @type {Progression[]} */
			const allProgressions = await progressionsRes.json();
			/** @type {Exercise[]} */
			const allExercises = await exercisesRes.json();

			const firstWorkout = allWorkouts[0];

			const exercises = firstWorkout.progressions
				.map((id) =>
					allProgressions.find((progression) => progression.id === id),
				)
				.map((progression) => progression.sets[0]);

			this.setHTMLUnsafe(template(exercises));
		}
	},
);
