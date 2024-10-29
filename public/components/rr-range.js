customElements.define('rr-range', class RRRange extends HTMLElement {
  /** @type {number[]} */ reps = []

  static observedAttributes = ['reps']

  attributeChangedCallback(
    /** @type {string} */ name,
    /** @type {string} */ prev,
    /** @type {string} */ next) {
    if (prev === next) return;

    switch (name) {
      case 'reps': {
        const reps = next.split(',').map(rep => Number(rep))
        this.reps = reps
        this.update();
      }
    }
  }

  update() {
    this.innerHTML = `
      <ul>
        ${this.reps.map(rep => `<li tabindex="0">${rep}</li>`).join('')}
      </ul> 
    `
    const container = this.querySelector('ul');

    container.addEventListener('scrollsnapchanging', (event) => {
      Array.from(event.target.children).forEach(child => child.classList.remove('active'))
      event.snapTargetInline.classList.add('active')
    });
  }
})