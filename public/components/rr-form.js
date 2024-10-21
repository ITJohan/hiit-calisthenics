import { addRepsToExercise } from "../db.js";

customElements.define(
  "rr-form",
  class RRForm extends HTMLElement {
    connectedCallback() {
      const form = this.querySelector("form");

      if (!form) throw new Error("Need to wrap a form element");

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(form);

        const workout = formData.entries().reduce((workout, [key, value]) => {
          const exerciseId = key.substring(0, 32);

          return {
            ...workout,
            [exerciseId]: workout[exerciseId]
              ? [...workout[exerciseId], Number(value)]
              : [Number(value)],
          };
        }, /** @type {{[key: string]: number[]}} */ ({}));

        Object.entries(workout).forEach((
          [exerciseId, sets],
        ) => addRepsToExercise(exerciseId, sets));
      });
    }
  },
);
