import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { globalStyle } from './styles';

const steps = [
  {
    navigation: html`<nav>HIIT Calisthenics</nav>`,
    info: html` <article>
      <p>Next workout</p>
      <p>B</p>
    </article>`,
    input: html` <aside>
      <input type="text" />
    </aside>`,
    button: html`<button>Start</button>`,
  },
  {
    navigation: html`<nav>< Warmup X</nav>`,
    info: html` <article>
      <p>Picture of person</p>
    </article>`,
    input: html` <aside>90</aside>`,
    button: html`<button>Start</button>`,
  },
];

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

  @state()
  private _currentStep = 0;

  render() {
    return html`
      <header>${steps[this._currentStep].navigation}</header>
      <main>
        ${steps[this._currentStep].info}${steps[this._currentStep].input}
      </main>
      <footer>
        ${steps[this._currentStep].button}<button @click="${this._onClick}">
          Test
        </button>
      </footer>
    `;
  }

  private _onClick = () => {
    this._currentStep++;
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'hiit-calisthenics': HiitCalisthenics;
  }
}
