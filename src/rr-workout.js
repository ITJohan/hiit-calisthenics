import { getExercise, getProgression, getWorkout } from "./db.js";
import "./rr-set.js";

function template(/** @type {IRRSet[]} */ rrSets) {
	return `
    <form>
      ${rrSets
				.map(
					(set) => `
        <rr-set
          name="${set.name}"
          url="${set.url}"
          reps="${set.reps}"
          id="${set.id}"
          prev-id="${set.prevId}"
          next-id="${set.nextId}"
        ></rr-set>`,
				)
				.join("")}
    </form>
  `;
}

customElements.define(
	"rr-workout",
	class RRWorkout extends HTMLElement {
		constructor() {
			super();
		}

		async connectedCallback() {
			const firstWorkout = getWorkout("d32b6d9c-8e2a-4b23-a261-19f17286e8f3");

			/** @type {IRRSet[]} */
			const rrSets = firstWorkout.progressions
				.map((id) => getProgression(id))
				.map((progression) => progression.sets[0])
				.map((set, index, { length }) => {
					const exercise = getExercise(set.exerciseId);
					return {
						name: exercise.name,
						url: exercise.url,
						reps: set.reps.map((rep) => String(rep)),
						id: `set-${index + 1}`,
						prevId: index === 0 ? "title" : `set-${index}`,
						nextId: index === length - 1 ? undefined : `set-${index + 2}`,
					};
				});

			this.setHTMLUnsafe(template(rrSets));
		}
	},
);
