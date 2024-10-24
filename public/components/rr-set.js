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
      const reps = Array(progressionSet.max + 1).fill(
        undefined,
      ).map((_, index) => index);
      const id = exercise.id + crypto.randomUUID().substring(0, 5);

      this.innerHTML = `
        <h2><a href=${exercise.url} target="_blank">${exercise.name}</a></h2>
        <img src="./assets/placeholder.jpg" width="50" />
        <div>
          <label for="${id}-input">Reps: <span>0</span></label>
          <input id="${id}-input" type="range" name="${id}" max="${progressionSet.max}" list="reps">
          <datalist id="reps">
            ${reps.map((rep) => `<option value="${rep}"></option>`).join("")}
          </datalist>
        </div>
        <nav>
          <button type="button">Previous</button>
          <button type="button">Next</button>
        </nav>
      `;

      const inputEl = this.querySelector("input");
      const spanEl = this.querySelector("span");
      const prevBtn = this.querySelector('button:first-child')
      const nextBtn = this.querySelector('button:last-child')
      if (inputEl === null || spanEl === null || prevBtn === null || nextBtn === null) {
        throw new Error("Could not query all elements");
      }

      inputEl.addEventListener("input", (event) => {
        spanEl.textContent =
          /** @type {HTMLInputElement} */ (event.target).value;
      });
      prevBtn.addEventListener('click', () => {
        console.log('prev')
        // TODO: go to previous
      })
      nextBtn.addEventListener('click', () => {
        console.log('next')
        // TODO: go to previous
      })
    }
  },
);
