import { css, html, LitElement } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { globalStyle } from './styles';
import { generateSteps } from './data';
import { InputType, Step, Workout } from './types';
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
  private _workout: Workout;

  @query('#reps-input')
  private _repsInput: HTMLInputElement;

  private _workouts: Workout[];

  constructor() {
    super();

    const storage = window.localStorage.getItem('workouts');
    this._workouts = JSON.parse(storage ?? '[]');

    if (!this._workouts || this._workouts.length === 0) {
      // First A
      this._steps = generateSteps('A', 0, 0, 0, 5);
      this._workout = {
        date: new Date(),
        workoutType: 'A',
        leg: {
          level: 0,
          sets: [],
        },
        pull: {
          level: 0,
          sets: [],
        },
        push: {
          level: 0,
          sets: [],
        },
      };

      return;
    }

    if (this._workouts.length === 1) {
      // First B
      this._steps = generateSteps('B', 0, 0, 0, 5);
      this._workout = {
        date: new Date(),
        workoutType: 'B',
        leg: {
          level: 0,
          sets: [],
        },
        push: {
          level: 0,
          sets: [],
        },
        pull: {
          level: 0,
          sets: [],
        },
      };

      return;
    }

    const previousWorkout = this._workouts[this._workouts.length - 2];
    const workoutType = previousWorkout.workoutType;
    const legLevel = previousWorkout.leg.level;
    const pushLevel = previousWorkout.push.level;
    const pullLevel = previousWorkout.pull.level;

    this._steps = generateSteps(workoutType, legLevel, pushLevel, pullLevel, 5);
    // TODO: pass the workout to steps or merge?
    this._workout = {
      date: new Date(),
      workoutType,
      leg: {
        level: legLevel,
        sets: [],
      },
      push: {
        level: pushLevel,
        sets: [],
      },
      pull: {
        level: pullLevel,
        sets: [],
      },
    };
  }

  private _changeStep = (nextStepId: number) => {
    if (this._currentStepId === -1) {
      // First step, do nothing
      this._currentStepId = nextStepId;

      return;
    }

    if (this._currentStepId === this._steps.length - 1) {
      // Finish step, save workout to localStorage
      const newWorkouts = [...this._workouts, this._workout];
      window.localStorage.setItem('workouts', JSON.stringify(newWorkouts));

      this._currentStepId = nextStepId;

      return;
    }

    if (this._steps[this._currentStepId].inputType === 'reps') {
      // Exercise step, add value to workout

      // TODO: Must merge workout with steps somehow

      this._currentStepId = nextStepId;

      return;
    }

    // All other steps
    this._currentStepId = nextStepId;
  };

  private _generateInput = (inputType: InputType, inputValue: number) => {
    switch (inputType) {
      case 'cooldown':
        return html`<cooldown-timer></cooldown-timer>`;
      case 'reps':
        return html`<input
          id="reps-input"
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
