customElements.define(
  "rr-rest",
  class RRRest extends HTMLElement {
    /** @type {HTMLTimeElement | null} */ timeElement = null;
    /** @type {number | undefined} */ intervalId = undefined;
    /** @type {number} */ time = 0;

    get active() {
      return this.getAttribute("active") === "" ? true : false;
    }
    set active(active) {
      active === true
        ? this.setAttribute("active", "")
        : this.removeAttribute("active");
    }

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

    // TODO: remove active attribute in favor of intersection observer

    static observedAttributes = ["time", "active"];

    attributeChangedCallback() {
      if (this.active && !this.intervalId) {
        this.intervalId = setInterval(() => {
          const timeAttribute = this.time;
          const time = Number(timeAttribute);

          if (time > 0) {
            this.time = time - 1;
            this.update();
          } else {
            this.active = false;
            this.time = Number(this.getAttribute('time'));

            clearInterval(this.intervalId);
            this.intervalId = undefined;
          }
        }, 1000);
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
