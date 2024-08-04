customElements.define('create-form', class CreateForm extends HTMLElement {
  constructor() {
    super();

    const addSetBtn = this.querySelector('#add-set-btn');

    if (!(addSetBtn instanceof HTMLButtonElement)) {
      throw new Error('#add-set-btn must be an instance of HTMLButtonElement');
    }

    addSetBtn.addEventListener('click', this);
  }

  handleEvent(/** @type {Event} */ event) {
    if (!(event.target instanceof HTMLButtonElement)) return;

    if (event.target.matches('#add-set-btn')) {
      console.log('adding set...');
    }
  }
})
