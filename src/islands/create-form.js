customElements.define('create-form', class CreateForm extends HTMLElement {
  constructor() {
    super();

    const addSetBtn = this.querySelector('#add-set-btn');

    if (!(addSetBtn instanceof HTMLButtonElement)) {
      throw new Error('#add-set-btn must be an instance of HTMLButtonElement');
    }

    addSetBtn.addEventListener('click', this);
    this.addEventListener('cali-circuit:copy-set', this)
  }

  handleEvent(/** @type {CustomEvent} */ event) {
    if (!(event.target instanceof HTMLElement)) return;

    if (event.target.matches('#add-set-btn')) {
      console.log('adding set...');
    }

    if (event.target.matches('create-set')) this.copySetHandler(event);
  }

  copySetHandler(/** @type {CustomEvent} */ event) {
    // Copy element
    const element = event.detail;
    if (!(element instanceof HTMLElement)) throw new Error('detail is not a HTMLElement');
    const elementCopy = /** @type {HTMLElement} */ (element.cloneNode(true));

    // Increment legend
    const legend = elementCopy.querySelector('legend');
    const legendParts = legend.textContent.split(' ');
    const newLegend = legendParts.map((part, index) => index === 1 ? String(Number(part) + 1): part).join(' ');
    legend.textContent = newLegend;

    // Increment labels and selects
    const exerciseContainers = elementCopy.querySelectorAll('.exercise-container');
    for (const exerciseContainer of exerciseContainers) {
      const label = exerciseContainer.querySelector('label');
      const select = exerciseContainer.querySelector('select');

      const id = select.getAttribute('id');
      const idParts = id.split('-');
      const newId = idParts.map((part, index) => index === 1 ? String(Number(part) + 1) : part).join('-');

      select.setAttribute('id', newId);
      select.setAttribute('name', newId);
      label.setAttribute('for', newId);
    }

    element.after(elementCopy);
  }
})
