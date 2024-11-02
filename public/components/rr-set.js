import { getExercise, getNextProgressionSet } from "../db.js";
import { isCategory } from "../utils/type-guards.js";
import "./rr-range.js";

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

    // TODO: show previous reps as initial

    update() {
      const progressionSet = getNextProgressionSet(this.category);
      const exercise = getExercise(progressionSet.exerciseId);
      const reps = Array(progressionSet.max + 1).fill(
        undefined,
      ).map((_, index) => index);
      const id = exercise.id + crypto.randomUUID().substring(0, 5);

      // TODO: maybe it's better to have the arrows fill the height.
      // Right now they're not aligned between views.
      // Maybe also makes it possible to extract a rr-view component

      this.innerHTML = `
        <h2>${exercise.name}</h2>
        <div>
          <span>&lt;&lt;</span>
          <img src="./assets/placeholder.jpg" alt="${exercise.name}" />
          <span>&gt;&gt;</span>
        </div>
        <rr-range name="${exercise.id}-${id}" reps="${reps.join(",")}"></rr-range>
      `;

      // TODO: start animating right arrow on change
    }
  },
);
