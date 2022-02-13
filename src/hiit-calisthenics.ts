import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { globalStyle } from './styles';
import { generateSteps } from './data';

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

      nav {
        display: flex;
        justify-content: space-between;
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
  private _steps = generateSteps(0, 0, 0, 5, 'A');

  @state()
  private _currentStepId = -1;

  render() {
    if (this._currentStepId === -1) {
      return html`
        <p>HIIT Calisthenics</p>
        <button @click="${() => this._changeStep(0)}">Start</button>
      `;
    }

    return html`
      <nav>
        <button
          @click="${() =>
            this._changeStep(this._steps[this._currentStepId].previousId)}"
        >
          <
        </button>
        <h1>${this._steps[this._currentStepId].headerText}</h1>
        <button>X</button>
      </nav>
      <main>
        <img src="${this._steps[this._currentStepId].image}" />
        <p>${this._steps[this._currentStepId].inputValue}</p>
      </main>
      <footer>
        <button
          @click="${() =>
            this._changeStep(this._steps[this._currentStepId].nextId)}"
        >
          ${this._steps[this._currentStepId].buttonText}
        </button>
      </footer>
    `;
  }

  private _changeStep = (stepId: number) => {
    this._currentStepId = stepId;
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'hiit-calisthenics': HiitCalisthenics;
  }
}
