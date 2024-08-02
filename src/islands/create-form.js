customElements.define('create-form', class CreateForm extends HTMLElement {
  constructor() {
    super();

    this.setContainer = this.querySelector('#set-container');      
    this.exerciseInput = this.querySelector('#exercise-input');
    this.addExerciseBtn = this.setContainer.querySelector('#add-exercise-btn');
    this.copySetBtn = this.setContainer.querySelector('#copy-set-btn');
    this.addSetBtn = this.querySelector('#add-set-btn');

    this.addExerciseBtn.addEventListener('click', this);
    this.copySetBtn.addEventListener('click', this);
    this.addSetBtn.addEventListener('click', this);
  }

  handleEvent(/** @type {Event} */ event) {
    if (!(event.target instanceof HTMLButtonElement)) return;

    if (event.target.matches('#add-exercise-btn')) {
      console.log('adding exercise...');
    }

    if (event.target.matches('#copy-set-btn')) {
      console.log('copying set...');
    }

    if (event.target.matches('#add-set-btn')) {
      console.log('adding set...');
    }
  }
})
