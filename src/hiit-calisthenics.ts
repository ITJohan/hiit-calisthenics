import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { globalStyle } from './styles';

const steps = [
  {
    headerText: 'Jumping jacks',
    image: './src/images/jumping-jacks.jpg',
    inputValue: 6,
    inputType: 'countdown',
    buttonText: 'Start',
    previousId: -1,
    nextId: 1,
  },
  {
    headerText: 'Wrist warmup',
    image: './src/images/jumping-jacks.jpg',
    inputValue: 6,
    inputType: 'countdown',
    buttonText: 'Start',
    previousId: 0,
    nextId: 2,
  },
  {
    headerText: 'Arm warmup',
    image: './src/images/jumping-jacks.jpg',
    inputValue: 6,
    inputType: 'countdown',
    buttonText: 'Start',
    previousId: 1,
    nextId: 3,
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
  private _currentStepId = 0;

  render() {
    return html`
      <nav>
        <button
          @click="${() =>
            this._changeStep(steps[this._currentStepId].previousId)}"
        >
          <
        </button>
        <h1>${steps[this._currentStepId].headerText}</h1>
        <button>X</button>
      </nav>
      <main>
        <img src="${steps[this._currentStepId].image}" />
        <p>${steps[this._currentStepId].inputValue}</p>
      </main>
      <footer>
        <button
          @click="${() => this._changeStep(steps[this._currentStepId].nextId)}"
        >
          ${steps[this._currentStepId].buttonText}
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
