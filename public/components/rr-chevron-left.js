customElements.define('rr-chevron-left', class RRChevronLeft extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <svg width="50" height="50">
        <line x1="45" y1="5" x2="25" y2="25" stroke="white" stroke-width="10" stroke-linecap="round" />
        <line x1="25" y1="25" x2="45" y2="45" stroke="white" stroke-width="10" stroke-linecap="round" />
        <line x1="25" y1="5" x2="5" y2="25" stroke="white" stroke-width="10" stroke-linecap="round" />
        <line x1="5" y1="25" x2="25" y2="45" stroke="white" stroke-width="10" stroke-linecap="round" />
      </svg>
    `
  }
})