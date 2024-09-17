function template() {
  return `
    <h2 id="shoulder-warmup">Shoulder warmup</h2>
    <iframe width="560" height="315" src="https://www.youtube.com/embed/Vwn5hSf3WEg?si=zLq8Hz64BDpF18Oy"
      title="YouTube video player" frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    <div>
      <label for="option1">1</label>
      <input type="radio" id="option1" name="numbers" value="1" hidden>
      <label for="option2">2</label>
      <input type="radio" id="option2" name="numbers" value="2" hidden>
      <label for="option3">3</label>
      <input type="radio" id="option3" name="numbers" value="3" hidden>
      <label for="option4">4</label>
      <input type="radio" id="option4" name="numbers" value="4" hidden>
    </div>
  `
}

customElements.define('rr-set', class RRSet extends HTMLElement {
  constructor() {
    super()
    this.setHTMLUnsafe(template())
  }
})
