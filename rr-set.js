import { getExercises, getProgressionsFromCategory } from "./db.js";

function template(
	/** @type {string} */ name,
	/** @type {string} */ url,
	/** @type {number[]} */ reps,
	/** @type {string} */ id,
) {
  return `
    <h2><a href=${url} target="_blank">${name}</a></h2>
    <img src="/assets/placeholder.jpg" width="600" />
    <div>
      ${reps
      .map(
        (rep) => `
          <label>
            <input type="radio" name="${id}" value="${rep}" required>
            ${rep}
          </label>
      `,
      )
      .join("")}
    </div>
  `;
}

customElements.define(
  "rr-set",
  class RRSet extends HTMLElement {
		/** @type {Category} */ category;

    connectedCallback() {
      const exercises = getExercises();
      const progressionsFromCategory = getProgressionsFromCategory(
        this.category,
      );
      const progressionSet = progressionsFromCategory[0].sets[0];

      const exercise = exercises.find(
        (exercise) => exercise.id === progressionSet.exerciseId,
      );

      const reps = Array(progressionSet.max - progressionSet.min + 1)
        .fill()
        .map((_, index) => progressionSet.min + index);

      const id = exercise.id + crypto.randomUUID().substring(0, 5);

      this.setHTMLUnsafe(
        template(exercise.name, exercise.url, reps, id),
      );
    }

    static observedAttributes = ["category"];

    attributeChangedCallback(
			/** @type {string} */ name,
			/** @type {string} */ prev,
			/** @type {string} */ next,
    ) {
      if (prev === next) return;

      this[name] = next;
    }
  },
);
