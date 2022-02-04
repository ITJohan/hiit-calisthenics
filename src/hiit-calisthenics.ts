import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('hiit-calisthenics')
export class HiitCalisthenics extends LitElement {
  render() {
    return html` <main>Hello</main> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'hiit-calisthenics': HiitCalisthenics;
  }
}
