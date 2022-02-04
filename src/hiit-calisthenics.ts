import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { globalStyle } from './styles';

@customElement('hiit-calisthenics')
export class HiitCalisthenics extends LitElement {
  static styles = [
    globalStyle,
    css`
      :host {
        display: flex;
        flex-direction: column;
        height: 100%;
        margin: auto;
        max-width: 600px;
      }

      header {
        padding: var(--spacing-md);
      }

      main {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        padding: var(--spacing-md);
      }

      article {
        height: 100%;
      }

      footer {
        padding: var(--spacing-md);
      }
    `,
  ];

  render() {
    return html`
      <header>
        <nav>HIIT Calisthenics</nav>
      </header>
      <main>
        <article>Image</article>
        <aside>Reps</aside>
      </main>
      <footer>
        <button>Start</button>
      </footer>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'hiit-calisthenics': HiitCalisthenics;
  }
}
