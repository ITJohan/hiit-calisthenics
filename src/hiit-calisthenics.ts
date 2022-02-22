import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { globalStyle } from './styles';
import { generateSteps } from './data';
import { InputType, Step } from './types';
import './cooldown-timer';
import { isLevel, isWorkoutType } from './utils';

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
  private _steps: Step[];

  @state()
  private _currentStepId = -1;

  @state()
  private _workout = [];

  constructor() {
    super();

    const workoutType = window.localStorage.getItem('workout-type');
    const legLevel = Number(window.localStorage.getItem('leg-level'));
    const pushLevel = Number(window.localStorage.getItem('push-level'));
    const pullLevel = Number(window.localStorage.getItem('pull-level'));

    if (
      isWorkoutType(workoutType) &&
      isLevel(legLevel) &&
      isLevel(pushLevel) &&
      isLevel(pullLevel)
    ) {
      this._steps = generateSteps(
        workoutType,
        legLevel,
        pushLevel,
        pullLevel,
        5
      );
    } else {
      this._steps = generateSteps('A', 0, 0, 0, 5);
    }
  }

  private _changeStep = (stepId: number) => {
    if (this._currentStepId === this._steps.length - 1) {
      // TODO: Save workout to localStorage
    } else {
      // TODO: Add set to workout
    }

    this._currentStepId = stepId;
  };

  private _generateInput = (inputType: InputType, inputValue: number) => {
    switch (inputType) {
      case 'cooldown':
        return html`<cooldown-timer></cooldown-timer>`;
      case 'reps':
        return html`<input
          type="number"
          min="0"
          max="${inputValue}"
          placeholder="${inputValue}"
        />`;
      default:
        return;
    }
  };

  protected render() {
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
}

declare global {
  interface HTMLElementTagNameMap {
    'hiit-calisthenics': HiitCalisthenics;
  }
}
