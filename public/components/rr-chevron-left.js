customElements.define('rr-chevron-left', class RRChevronLeft extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <svg width="100" height="100">
        <line x1="95" y1="5" x2="50" y2="50" stroke="white" stroke-width="10" stroke-linecap="round" />
        <line x1="50" y1="50" x2="95" y2="95" stroke="white" stroke-width="10" stroke-linecap="round" />
        <line x1="50" y1="5" x2="5" y2="50" stroke="white" stroke-width="10" stroke-linecap="round" />
        <line x1="5" y1="50" x2="50" y2="95" stroke="white" stroke-width="10" stroke-linecap="round" />
      </svg>
    `
  }
})