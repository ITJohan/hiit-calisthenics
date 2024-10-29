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
        ${this.reps.map((rep, index) => `<li tabindex="0" ${index === 0 ? 'class="active"' : ''}>${rep}</li>`).join('')}
      </ul> 
    `
    const container = this.querySelector('ul');
    if (container === null) throw new Error('can not find the container')

    container.addEventListener('scrollsnapchanging', (event) => {
      const target = /** @type {HTMLUListElement} */ (event.target);
      Array.from(target.children).forEach(child => child.classList.remove('active'))
      // @ts-ignore: snapTargetInline is newly available
      event.snapTargetInline.classList.add('active')
    });
  }
})