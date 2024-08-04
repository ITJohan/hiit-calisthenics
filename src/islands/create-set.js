customElements.define('create-set', class CreateSet extends HTMLElement {
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

    console.log(event.target);
  }
});

