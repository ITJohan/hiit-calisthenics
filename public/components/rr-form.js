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

        for (const [key, value] of formData) {
          const exerciseId = key.substring(0, 32);
          addRepsToExercise(exerciseId, Number(value));
        }
      });
    }
  },
);
