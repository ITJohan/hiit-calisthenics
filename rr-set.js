function template(
	/** @type {string} */ name,
	/** @type {string} */ url,
	/** @type {string} */ reps,
	/** @type {string} */ id,
) {
  return `
    <h2>${name}</h2>
    <iframe
      width="560"
      height="315"
      src="${url}"
      title="YouTube video player"
      frameborder="0"
      loading="lazy"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
    ></iframe>
    <div>
      ${reps
      .split(",")
      .map(
        (rep) => `
        <label for="rep-${rep}">${rep}</label>
        <input type="radio" id="rep-${rep}" name="${id}" value="${rep}" hidden>
      `,
      )
      .join("")}
    </div>
  `;
}

customElements.define(
  "rr-set",
  class RRSet extends HTMLElement {
		/** @type {string} */ name;
		/** @type {string} */ url;
		/** @type {string} */ reps;
		/** @type {string} */ id;

    connectedCallback() {
      this.setHTMLUnsafe(template(this.name, this.url, this.reps, this.id));
    }

    static observedAttributes = ["name", "url", "reps", "id"];

    attributeChangedCallback(
			/** @type {string} */ name,
			/** @type {string} */ prev,
			/** @type {string} */ next,
    ) {
      if (prev === next) return;

      this[name] = next;
    }
  },
);
