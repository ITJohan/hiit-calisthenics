customElements.define('create-workout-form', class CreateWorkoutForm extends HTMLElement {
  /** @type {number} */ #nextSetId = 1;
  /** @type {HTMLButtonElement} */ #addSetBtn;

  constructor() {
    super();

    this.#addSetBtn = this.querySelector('#add-set-btn');
    this.#addSetBtn.addEventListener('click', this);
    this.addEventListener('cali-circuit:copy-set', this)
  }

  handleEvent(/** @type {CustomEvent} */ event) {
    if (!(event.target instanceof HTMLElement)) return;
    if (event.target.matches('#add-set-btn')) this.addSet();
    if (event.target.matches('create-workout-set')) this.copySetHandler(event);
  }

  addSet() {
    const template = this.querySelector('[create-workout-set-template]');
    
    if (!(template instanceof HTMLTemplateElement)) throw new Error('Not an instance of HTMLTemplateElement');

    const fragment = template.content.cloneNode(true);

    if (!(fragment instanceof DocumentFragment)) throw new Error('Not an instance of DocumentFragment');

    fragment.firstElementChild.setAttribute('set-id', String(this.#nextSetId));
    template.before(fragment);

    this.#nextSetId++;
  }

  copySetHandler(/** @type {CustomEvent} */ event) {
    const element = event.detail;
    if (!(element instanceof HTMLElement)) throw new Error('Not an instance of HTMLElement');
    const elementCopy = /** @type {HTMLElement} */ (element.cloneNode(true));

    elementCopy.setAttribute('set-id', String(this.#nextSetId));
    this.#addSetBtn.parentElement.before(elementCopy);

    this.#nextSetId++;
  }
})
