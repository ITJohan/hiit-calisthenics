customElements.define('create-workout-exercise', class CreateWorkoutExercise extends HTMLElement {
  static observableAttributes = ['set-id', 'exercise-id'];

  /** @type {string} */ setId
  /** @type {string} */ exerciseId

  constructor() {
    super();

    this.label = this.querySelector('label');
    this.select = this.querySelector('select');
  }

  attributeChangedCallback(
    /** @type {string} */ name,
    /** @type {string} */ prev,
    /** @type {string} */ next
  ) {
    if (prev === next) return;

    this[name.replace(/-(\w)/g, (_, letter) => letter.toUpperCase())] = next;

    const newId = `set-${this.setId}-exercise-${this.exerciseId}`;

    this.label.setAttribute('for', newId);
    this.select.setAttribute('id', newId);
    this.select.setAttribute('name', newId);
  }
})
