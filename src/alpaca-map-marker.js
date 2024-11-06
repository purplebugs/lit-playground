import { LitElement, nothing, html, css } from "lit";
import "./alpaca-map-icon.js";

export default class AlpacaMapMarker extends LitElement {
  static properties = {
    id: { type: Number },
    name: { type: String },
    category: { type: String },
    count: { type: Number },
    city: { type: String },
    address: { type: String },
    url_full: { type: String },
    url_pretty: { type: String },
    directions: { type: String },
    highlight: {
      type: String,
      converter: (value) => {
        if (value === "true") {
          return "highlight";
        } else {
          return "";
        }
      },
    } /* If a property changes the element re-renders */,
    linkToFarmPage: { type: Boolean },
  };

  constructor() {
    super();
    this.name;
    this.category;
    this.count;
    this.city;
    this.address;
    this.url_full;
    this.url_pretty;
    this.directions;
    this.highlight = false;
  }

  // When element is connected to the DOM connectedCallback() is called.
  // This is needed in order to know the value of this.key which is passed in from the attribute

  connectedCallback() {
    super.connectedCallback();
  }

  renderLinkToFarmPage() {
    if (this.linkToFarmPage) {
      return html`
        <a
          href="https://www.alpaca.life/farm/${this.id}"
          onclick="event.stopPropagation()"
        >
          <div class="farm-marker-link">
            <address class="farm-info">
              <span class="icon"
                ><alpaca-map-icon icon="circleInfo"></alpaca-map-icon></span
              ><span class="text">Farm info</span>
            </address>
          </div>
        </a>
      `;
    }

    return html`${nothing}`;
  }

  renderLinkToWebPage() {
    if (this.url_full === null || this.url_full === undefined) {
      return html`${nothing}`;
    }

    if (this.url_pretty === null || this.url_pretty === undefined) {
      return html`${nothing}`;
    }

    return html`
      <a
        href="${this.url_full}"
        target="_blank"
        rel="noreferrer"
        title="${this.url_pretty}"
        onclick="event.stopPropagation()"
      >
        <div class="farm-marker-link">
          <address class="webpage">
            <alpaca-map-icon icon="car" class="icon"></alpaca-map-icon
            ><span class="text">Webpage</span
            ><alpaca-map-icon
              icon="arrowUpRightFromSquare"
              class="icon link-arrow"
            ></alpaca-map-icon>
          </address>
        </div>
      </a>
    `;
  }

  createRenderRoot() {
    // Turns off shadow DOM.
    // Since AlpacaMapMarker is not used externally, only by AlpacaMap then we want to inherit all styling, so turn off shadow DOM.
    return this;
  }

  render() {
    return html` <div class="farm-marker ${this.category} ${this.highlight}">
      <div class="summary">
        <div class="icon">
          <alpaca-map-icon
            icon="${this.category === "private" ? "key" : "houseFlag"}"
          ></alpaca-map-icon>
        </div>
        <div class="count">${this.count} 🦙</div>
      </div>
      <div class="more-info ${this.highlight}">
        <div class="name">
          <h2>${this.name}</h2>
        </div>
        <div class="city">
          <address>
            <alpaca-map-icon icon="locationDot"></alpaca-map-icon>${this.city}
          </address>
        </div>
        <div class="address">
          <address>${this.address}</address>
        </div>

        ${this.renderLinkToFarmPage()} ${this.renderLinkToWebPage()}

        <a
          href="${this.directions}"
          target="_blank"
          rel="noreferrer"
          title="Google directions"
          onclick="event.stopPropagation()"
        >
          <div class="farm-marker-link">
            <address class="directions">
              <alpaca-map-icon icon="car" class="icon"></alpaca-map-icon
              ><span class="text">Directions</span
              ><alpaca-map-icon
                icon="arrowUpRightFromSquare"
                class="icon link-arrow"
              ></alpaca-map-icon>
            </address>
          </div>
        </a>
      </div>
    </div>`;
  }
}

if (!customElements.get("alpaca-map-marker")) {
  customElements.define("alpaca-map-marker", AlpacaMapMarker);
}
