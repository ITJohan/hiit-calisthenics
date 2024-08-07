customElements.define('create-workout-set', class CreateWorkoutSet extends HTMLElement {
  static observedAttributes = ['set-id'];

  /** @type {string} */ setId;
  /** @type {number} */ #nextExerciseId = 1;
  /** @type {HTMLLegendElement} */ #legend;
  /** @type {HTMLButtonElement} */ #addExerciseBtn;
  /** @type {HTMLButtonElement} */ #copySetBtn;
  /** @type {HTMLButtonElement} */ #deleteSetBtn;

  constructor() {
    super();

    this.#legend = this.querySelector('legend');
    this.#addExerciseBtn = this.querySelector('.add-exercise-btn');
    this.#copySetBtn = this.querySelector('.copy-set-btn');
    this.#deleteSetBtn = this.querySelector('.delete-set-btn');

    this.#addExerciseBtn.addEventListener('click', this);
    this.#copySetBtn.addEventListener('click', this);
    this.#deleteSetBtn.addEventListener('click', this);
  }

  handleEvent(/** @type {Event} */ event) {
    if (!(event.target instanceof HTMLButtonElement)) return;
    if (event.target.matches('.add-exercise-btn')) this.#addExercise();
    if (event.target.matches('.copy-set-btn')) this.#copySet();
    if (event.target.matches('.delete-set-btn')) this.#deleteSet();
  }

  attributeChangedCallback(
    /** @type {string} */ name,
    /** @type {string | null} */ prev,
    /** @type {string | null} */ next
  ) {
    if (next === prev) return;
    
    this[name.replace(/-(\w)/g, (_, letter) => letter.toUpperCase())] = next;

    this.#legend.textContent = `Set ${next}`;   
    const createSetExercises = this.querySelectorAll('create-set-exercise');
    createSetExercises.forEach((element) => element.setAttribute('set-id', next));
  }

  disconnectedCallback() {
    this.#addExerciseBtn.removeEventListener('click', this)
    this.#copySetBtn.removeEventListener('click', this)
    this.#deleteSetBtn.removeEventListener('click', this)
  }

  #addExercise() {
    const template = document.querySelector('#create-set-exercise-template');

    if (!(template instanceof HTMLTemplateElement)) throw new Error('Not an instance of HTMLTemplateElement');

    const fragment = template.content.cloneNode(true);

    if (!(fragment instanceof DocumentFragment)) throw new Error('Not an instance of DocumentFragment');

    fragment.firstElementChild.setAttribute('set-id', this.setId);
    fragment.firstElementChild.setAttribute('exercise-id', String(this.#nextExerciseId));

    this.#addExerciseBtn.parentElement.before(fragment);

    this.#nextExerciseId++;
  }

  #copySet() {
    const event = new CustomEvent('cali-circuit:copy-set', {bubbles: true, detail: this})
    this.dispatchEvent(event);
  }

  #deleteSet() {
    const event = new CustomEvent('cali-circuit:delete-set', {bubbles: true, detail: this});
    this.dispatchEvent(event);
  }
});

