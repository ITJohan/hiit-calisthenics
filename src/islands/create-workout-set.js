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
  }

  attributeChangedCallback(
    /** @type {string} */ name,
    /** @type {string | null} */ prev,
    /** @type {string | null} */ next
  ) {
    if (next === prev) return;
    
    this[name.replace(/-(\w)/g, (_, letter) => letter.toUpperCase())] = next;

    this.#legend.textContent = `Set ${next}`;   
  }

  #addExercise() {
    const template = this.querySelector('#create-set-exercise-template');

    if (!(template instanceof HTMLTemplateElement)) throw new Error('Not an instance of HTMLTemplateElement');

    const fragment = template.content.cloneNode(true);

    if (!(fragment instanceof DocumentFragment)) throw new Error('Not an instance of DocumentFragment');

    fragment.firstElementChild.setAttribute('set-id', this.setId);
    fragment.firstElementChild.setAttribute('exercise-id', String(this.#nextExerciseId));

    template.before(fragment);

    this.#nextExerciseId++;
  }

  #copySet() {
    const event = new CustomEvent('cali-circuit:copy-set', {bubbles: true, detail: this})
    this.dispatchEvent(event);
  }
});

