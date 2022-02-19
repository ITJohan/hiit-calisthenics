import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { globalStyle } from './styles';
import { generateSteps } from './data';
import { InputType } from './types';

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

    const step = this._steps[this._currentStepId];

    const input = this._generateInput(step.inputType, step.inputValue);

    return html`
      <nav>
        <button @click="${() => this._changeStep(step.previousId)}"><</button>
        <h1>${step.headerText}</h1>
        <button @click="${() => this._changeStep(-1)}">X</button>
      </nav>
      <main>
        <img src="${step.image}" />
        ${input}
      </main>
      <footer>
        <button @click="${() => this._changeStep(step.nextId)}">
          ${step.buttonText}
        </button>
      </footer>
    `;
  }

  private _changeStep = (stepId: number) => {
    this._currentStepId = stepId;
  };

  private _generateInput = (inputType: InputType, inputValue: number) => {
    switch (inputType) {
      case 'cooldown':
        return html`<p>Cooldown ${inputValue}</p>`;
      case 'reps':
        return html`<p>Reps ${inputValue}</p>`;
      default:
        return;
    }
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'hiit-calisthenics': HiitCalisthenics;
  }
}
