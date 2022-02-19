import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';

@customElement('cooldown-timer')
export class CooldownTimer extends LitElement {
  @state()
  _timer = 60;

  render() {
    if (this._timer !== 0) {
      setTimeout(() => this._timer--, 1000);
    } else {
      return html`<p>Go!</p>`;
    }

    return html`<p>Rest for ${this._timer} seconds</p>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cooldown-timer': CooldownTimer;
  }
}
