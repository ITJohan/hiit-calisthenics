customElements.define('rr-rest', class RRRest extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <h2>Rest</h2>
      <p>Ad</p>
      <time></time>
    `
    setInterval(() => {
      const timeAttribute = this.getAttribute('time');

      if (timeAttribute === null || isNaN(Number(timeAttribute))) {
        throw new Error('Attribute time needs to be a number')
      }

      const time = Number(timeAttribute);

      if (time > 0) {
        this.setAttribute('time', String(time - 1))
        this.update()
      }
    }, 1000)

    this.update()
  }

  static observedAttributes = ['time']

  attributeChangedCallback() {
    this.update()
  }

  update() {
    const timeEl = this.querySelector('time')
    if (timeEl) {
      timeEl.textContent = this.getAttribute('time');
    }
  }
})
