import './rr-set.js'

function template() {
  return `
    <form>
      <rr-set></rr-set>
      <rr-set id="2"></rr-set>
      <rr-set></rr-set>
      <rr-set></rr-set>
      <rr-set></rr-set>
      <rr-set></rr-set>
      <rr-set></rr-set>
    </form>
  `
}

customElements.define('rr-workout', class RRWorkout extends HTMLElement {
  constructor() {
    super();
    this.setHTMLUnsafe(template());
  }
})
