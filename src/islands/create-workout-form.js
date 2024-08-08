/** @implements {ICreateWorkoutForm} */
class CreateWorkoutForm extends HTMLElement {
  /** @type {HTMLButtonElement} */ #addSetBtn;

  constructor() {
    super();

    this.#addSetBtn = this.querySelector('#add-set-btn');
    this.#addSetBtn.addEventListener('click', this);
    this.addEventListener('cali-circuit:copy-set', this);
    this.addEventListener('cali-circuit:delete-set', this);
  }

  handleEvent(/** @type {CustomEvent} */ event) {
    if (!(event.target instanceof HTMLElement)) return;
    if (event.target.matches('#add-set-btn')) this.#addSet();
    if (event.type === 'cali-circuit:copy-set') this.#copySetHandler(event);
    if (event.type === 'cali-circuit:delete-set') this.#deleteSetHandler(event);
  }

  disconnectedCallback() {
    this.#addSetBtn.removeEventListener('click', this);
    this.removeEventListener('cali-circuit:copy-set', this);
    this.removeEventListener('cali-circuit:delete-set', this);
  }

  #addSet() {
    const lastSetElement = document.querySelector('create-workout-set:last-of-type');
    
    if (!(lastSetElement instanceof HTMLElement)) throw new Error('Not an instance of HTMLElement');

    const lastSetId = Number(lastSetElement.getAttribute('set-id'));
    const lastSetElementCopy = /** @type {ICreateWorkoutSet} */ (lastSetElement.cloneNode(true));
    lastSetElementCopy.resetExercises();
    lastSetElementCopy.setAttribute('set-id', String(lastSetId + 1));
    lastSetElement.after(lastSetElementCopy);
  }

  #copySetHandler(/** @type {CustomEvent} */ event) {
    const element = event.detail;

    if (!(element instanceof HTMLElement)) throw new Error('Not an instance of HTMLElement');

    const elementCopy = /** @type {HTMLElement} */ (element.cloneNode(true));

    const lastSetElement = this.querySelector('create-workout-set:last-of-type');
    const lastSetId = Number(lastSetElement.getAttribute('set-id'));
    elementCopy.setAttribute('set-id', String(lastSetId + 1));
    lastSetElement.after(elementCopy);
  }

  #deleteSetHandler(/** @type {CustomEvent} */ event) {
    const element = event.detail;

    if (!(element instanceof HTMLElement)) throw new Error('Not an instance of HTMLElement');

    const createWorkoutSets = this.querySelectorAll('create-workout-set');
    const deletedSetId = Number(element.getAttribute('set-id'));

    createWorkoutSets.forEach((element) => {
      const setId = Number(element.getAttribute('set-id'));

      if (setId > deletedSetId) {
        const newSetId = setId - 1;
        element.setAttribute('set-id', String(newSetId));
      }
    });
    
    element.remove();
  }
};

customElements.define('create-workout-form', CreateWorkoutForm);
