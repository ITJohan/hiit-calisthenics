customElements.define(
  "rr-rest",
  class RRRest extends HTMLElement {
    /** @type {HTMLTimeElement | null} */ timeElement = null;
    /** @type {number | undefined} */ intervalId = undefined;
    /** @type {number} */ time = 0;
    /** @type {boolean} */ active = false;

    connectedCallback() {
      this.innerHTML = `
        <h2>Rest</h2>
        <div>
          <span>&lt;&lt;</span>
          <div>
            <p>Ad</p>
          </div>
          <span>&gt;&gt;</span>
        </div>
        <div>Rest: <time></time></div>
  `;

      // TODO: animate right arrow when timers finished

      this.timeElement = this.querySelector("time");
      this.update();
    }

    disconnectedCallback() {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }

    static observedAttributes = ["time", "active"];

    attributeChangedCallback(
      /** @type {string} */ name,
      /** @type {string} */ prev,
      /** @type {string} */ next,
    ) {
      if (prev === next) return;

      switch (name) {
        case "time": {
          const time = Number(next)
          if (isNaN(time)) throw new Error('time must be a number')
          this.time = time;
          break;
        }
        case "active": {
          if (this.intervalId) {
            const time = Number(this.getAttribute('time'))
            if (isNaN(time)) throw new Error('time must be a number')
            this.time = time;
            clearInterval(this.intervalId);
            this.intervalId = undefined;
            this.update();
          }

          this.active = next === null ? false : true;
          if (this.active === false) break;

          this.intervalId = setInterval(() => {
            if (this.time > 0) {
              this.time = this.time - 1;
              this.update();
            } else {
              this.removeAttribute('active')
            }
          }, 1000);
          break;
        }
      }

      this.update();
    }

    update() {
      if (this.timeElement) {
        this.timeElement.textContent = String(this.time);
      }
    }
  },
);
