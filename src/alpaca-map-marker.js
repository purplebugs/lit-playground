import { LitElement, html, css } from "lit";
import "./alpaca-map-icon.js";

export default class AlpacaMapMarker extends LitElement {
  static properties = {
    name: { type: String },
    category: { type: String },
    count: { type: Number },
    city: { type: String },
    address: { type: String },
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
  };

  constructor() {
    super();
    this.name;
    this.category;
    this.count;
    this.city;
    this.address;
    this.directions;
    this.highlight = false;
  }

  // When element is connected to the DOM connectedCallback() is called.
  // This is needed in order to know the value of this.key which is passed in from the attribute

  connectedCallback() {
    super.connectedCallback();
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

        <a
          href="${this.directions}"
          target="_blank"
          rel="noreferrer"
          title="Google directions"
        >
          <div class="farm-marker-link">
            <address class="directions">
              <alpaca-map-icon icon="car" class="icon"></alpaca-map-icon
              ><span>Directions</span
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
