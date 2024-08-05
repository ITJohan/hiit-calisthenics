customElements.define('create-workout-set', class CreateWorkoutSet extends HTMLElement {
  static observedAttributes = ['set-id'];
  constructor() {
    super();

    const addExerciseBtn = this.querySelector('.add-exercise-btn');
    const copySetBtn = this.querySelector('.copy-set-btn');
    const deleteSetBtn = this.querySelector('.delete-set-btn');

    if (!(addExerciseBtn instanceof HTMLButtonElement)) {
      throw new Error('.add-exercise-btn is not an instance of HTMLButtonElement');
    }

    if (!(copySetBtn instanceof HTMLButtonElement)) {
      throw new Error('.copy-set-btn is not an instance of HTMLButtonElement');
    }

    if (!(deleteSetBtn instanceof HTMLButtonElement)) {
      throw new Error('.delete-set-btn is not an instance of HTMLButtonElement');
    }

    addExerciseBtn.addEventListener('click', this);
    copySetBtn.addEventListener('click', this);
    deleteSetBtn.addEventListener('click', this);
  }

  handleEvent(/** @type {Event} */ event) {
    if (!(event.target instanceof HTMLButtonElement)) return;

    if (event.target.matches('.add-exercise-btn')) this.addExercise();
    if (event.target.matches('.copy-set-btn')) this.copySet();
  }

  attributeChangedCallback(
    /** @type {string} */ name,
    /** @type {string | null} */ prev,
    /** @type {string | null} */ next
  ) {
    if (next === prev) return;
    
    if (name === 'set-id') {
      // TODO: set ids on subcomponents
    }
  }

  addExercise() {
    const lastExerciseContainer = this.querySelector('.exercise-container:nth-last-child(2)');
    const exerciseContainer = lastExerciseContainer.cloneNode(true);

    if (!(exerciseContainer instanceof HTMLElement)) {
      throw new Error('exerciseContainerCopy is not an instance of HTMLElement')
    }

    const label = exerciseContainer.querySelector('label');
    const select = exerciseContainer.querySelector('select');      

    const labelParts = label.textContent.split(' ');
    const selectIdParts = select.getAttribute('id').split('-');
    
    const newLabel = labelParts.map((part, index) => index === 1 ? String(Number(part) + 1) : part).join(' ');
    const newSelectId = selectIdParts.map((part, index) => index === 3 ? String(Number(part) + 1) : part).join('-');

    label.textContent = newLabel;
    label.setAttribute('for', newSelectId);
    select.setAttribute('id', newSelectId);
    select.setAttribute('name', newSelectId);

    lastExerciseContainer.after(exerciseContainer);
  }

  copySet() {
    const event = new CustomEvent('cali-circuit:copy-set', {bubbles: true, detail: this})
    this.dispatchEvent(event);
  }
});

