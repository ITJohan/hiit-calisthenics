import { getExercises } from "../db.js";
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
      const exercises = getExercises();
      const exercise = exercises[0];
      const reps = [6, 7, 8, 9, 10];

      const id = exercise.id + crypto.randomUUID().substring(0, 5);

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
