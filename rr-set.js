import { getExercises, getProgressionsFromCategory } from "./db.js";

function template(
	/** @type {string} */ name,
	/** @type {string} */ url,
	/** @type {number[]} */ reps,
	/** @type {string} */ id,
) {
  return `
    <h2>${name}</h2>
    <iframe
      width="560"
      height="315"
      src="${url}"
      title="YouTube video player"
      frameborder="0"
      loading="lazy"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
    ></iframe>
    <div>
      ${reps
      .map(
        (rep) => `
        <label for="rep-${rep}">${rep}</label>
        <input type="radio" id="rep-${rep}" name="${id}" value="${rep}" hidden>
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

      this.setHTMLUnsafe(
        template(exercise.name, exercise.url, reps, exercise.id),
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
