import { LitElement, html, css } from "lit";
import "./alpaca-map-icon";

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

  static styles = [
    css`
      /********* Farm styles in unhighlighted state *********/
      /* Ref: https://developers.google.com/maps/documentation/javascript/advanced-markers/html-markers#maps_advanced_markers_html-css */

      .farm {
        display: flex;
        align-items: center;
        justify-content: center;

        background-color: white;
        border-radius: 1rem;
        box-shadow: 10px 10px 5px #0003;
        color: var(--almost-black);

        /* Override google map font to avoid flicker when load */
        font:
          400 1.5em Poppins,
          Arial,
          sans-serif;
        padding: 0.75rem;

        width: auto;
        max-width: 15rem;
      }

      .farm::after {
        border-left: 9px solid transparent;
        border-right: 9px solid transparent;
        content: "";
        height: 0;
        left: 50%;
        position: absolute;
        top: 100%;
        transform: translate(-50%);
        width: 0;
        z-index: 1;
      }

      .farm .summary {
        display: flex;
        align-items: center;
        justify-content: center;

        font-size: 1.5rem;
        gap: 0.5rem;
      }

      .farm .details {
        display: none;
        flex-direction: column;
        flex: 1;
      }

      /********* Farm styles in highlighted state *********/

      /*       .farm.highlight {
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 10px 10px 5px rgba(0, 0, 0, 0.2);
        height: 80px;
        padding: 8px 15px;
        width: auto;
      } */

      .farm.highlight .details {
        display: flex;
      }

      /********* Farm category colours *********/
      .farm.private {
        border: 0.2em solid var(--private-farm);
      }

      .farm.public {
        border: 0.2em solid var(--public-farm);
      }

      .farm.private::after {
        border-top: 9px solid var(--private-farm);
      }

      .farm.public::after {
        border-top: 9px solid var(--public-farm);
      }
    `,
  ];

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

  render() {
    return html` <div class="farm ${this.category} ${this.highlight}">
      <div class="summary">
        <alpaca-map-icon
          icon="${this.category === "private" ? "key" : "houseFlag"}"
        ></alpaca-map-icon>
        <div class="count">${this.count} 🦙</div>
      </div>

      <div class="details">
        <h4>${this.name}</h4>
        ${this.city}
        <address>${this.address}</address>
        <address>
          <a
            href="${this.directions}"
            target="_blank"
            rel="noreferrer"
            title="Google directions"
            >Directions</a
          >
        </address>
      </div>
    </div>`;
  }
}

if (!customElements.get("alpaca-map-marker")) {
  customElements.define("alpaca-map-marker", AlpacaMapMarker);
}
