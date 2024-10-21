import { getExercise, getNextProgressionSet } from "../db.js";
import { isCategory } from "../utils/type-guards.js";

// UI inspo: https://www.youtube.com/watch?v=KrJZPrCqhWU&list=WL&index=13

customElements.define(
  "rr-set",
  class RRSet extends HTMLElement {
    get category() {
      const category = this.getAttribute("category");
      if (category === null) throw new Error("category is required");
      if (!isCategory(category)) throw new Error("category is of wrong type");

      return category;
    }
    set category(category) {
      if (category === null) {
        this.removeAttribute("category");
        return;
      }
      if (!isCategory(category)) throw new Error("category is of wrong type");

      this.setAttribute("category", category);
    }

    static observedAttributes = ["category"];

    attributeChangedCallback() {
      this.update();
    }

    update() {
      const progressionSet = getNextProgressionSet(this.category);
      const exercise = getExercise(progressionSet.exerciseId);
      const reps = Array(progressionSet.max - progressionSet.min + 1).fill(
        undefined,
      ).map((
        _,
        index,
      ) => progressionSet.min + index);
      const id = exercise.id + crypto.randomUUID().substring(0, 5);

      // TODO: scroll to next rr-rest and set active attribute on input change

      this.innerHTML = `
        <h2><a href=${exercise.url} target="_blank">${exercise.name}</a></h2>
        <img src="/assets/placeholder.jpg" width="600" />
        <div>
          ${
        reps
          .map(
            (rep) => `
              <label>
                <input type="radio" name="${id}" value="${rep}" required>
                ${rep}
              </label>
          `,
          )
          .join("")
      }
        </div>
  `;
    }
  },
);
