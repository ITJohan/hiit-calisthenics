function template(/** @type {number} */ time) {
  return `
    <h2>Rest</h2>
    <p>Ad</p>
    <time>${time}</time>
  `
}

customElements.define('rr-rest', class RRRest extends HTMLElement {
  /** @type {number} */ time

  connectedCallback() {
    this.setHTMLUnsafe(template(this.time))
  }

  static observedAttributes = ['time']

  attributeChangedCallback(
		/** @type {string} */ name,
		/** @type {string} */ prev,
		/** @type {string} */ next,
  ) {
    if (prev === next) return;

    this[name] = Number(next);
  }
})
