customElements.define('create-set-exercise', class CreateSetExercise extends HTMLElement {
  /** @type {string} */ setId
  /** @type {string} */ exerciseId
  /** @type {HTMLLabelElement} */ #label;
  /** @type {HTMLSelectElement} */ #select;
  /** @type {HTMLButtonElement} */ #deleteExerciseBtn;

  constructor() {
    super();

    this.#label = this.querySelector('label');
    this.#select = this.querySelector('select');
    this.#deleteExerciseBtn = this.querySelector('[delete-exercise-btn]');

    this.#deleteExerciseBtn.addEventListener('click', this);
  }

  handleEvent(/** @type {CustomEvent} */ event) {
    if (!(event.target instanceof HTMLElement)) throw new Error('Not an instance of HTMLElement');

    if (event.target.matches('[delete-exercise-btn]')) this.#deleteExerciseHandler();
  }

  disconnectedCallback() {
    this.#deleteExerciseBtn.removeEventListener('click', this);
  }

  static observedAttributes = ['set-id', 'exercise-id'];

  attributeChangedCallback(
    /** @type {string} */ name,
    /** @type {string} */ prev,
    /** @type {string} */ next
  ) {
    if (prev === next) return;

    this[name.replace(/-(\w)/g, (_, letter) => letter.toUpperCase())] = next;

    if (name === 'exercise-id') {
      this.#label.textContent = `Exercise ${next}`;
    }

    const newId = `set-${this.setId}-exercise-${this.exerciseId}`;

    this.#label.setAttribute('for', newId);
    this.#select.setAttribute('id', newId);
    this.#select.setAttribute('name', newId);
  }

  #deleteExerciseHandler() {
    const event = new CustomEvent('cali-circuit:delete-exercise', {bubbles: true, detail: this});
    this.dispatchEvent(event);
  }
})
