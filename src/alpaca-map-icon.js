import { LitElement, html, css, svg } from "lit";

export default class AlpacaMapIcon extends LitElement {
  static properties = {
    icon: { type: String },
  };

  static styles = [
    css`
      .icon {
        width: 1em;
        height: 1em;
        vertical-align: -0.125em;
      }

      .private {
        fill: var(--private-farm);
      }

      .public {
        fill: var(--public-farm);
      }
    `,
  ];

  constructor() {
    super();
    this.icon;
  }

  // When element is connected to the DOM connectedCallback() is called.
  // This is needed in order to know the value of this.key which is passed in from the attribute

  connectedCallback() {
    super.connectedCallback();
  }

  _iconHouseFlag() {
    const path = svg`<path d="M480 0c-17.7 0-32 14.3-32 32V192 512h64V192H624c8.8 0 16-7.2 16-16V48c0-8.8-7.2-16-16-16H512c0-17.7-14.3-32-32-32zM416 159L276.8 39.7c-12-10.3-29.7-10.3-41.7 0l-224 192C1 240.4-2.7 254.5 2 267.1S18.6 288 32 288H64V480c0 17.7 14.3 32 32 32h64c17.7 0 32-14.3 32-32V384c0-17.7 14.3-32 32-32h64c17.7 0 32 14.3 32 32v96c0 17.7 14.3 32 32 32h64.7l.2 0h-1V159z" />`;

    return html`<svg class="icon public" viewBox="0 0 640 512">${path}</svg>`;
  }

  _iconKey() {
    const path = svg`<path d="M336 352c97.2 0 176-78.8 176-176S433.2 0 336 0S160 78.8 160 176c0 18.7 2.9 36.8 8.3 53.7L7 391c-4.5 4.5-7 10.6-7 17v80c0 13.3 10.7 24 24 24h80c13.3 0 24-10.7 24-24V448h40c13.3 0 24-10.7 24-24V384h40c6.4 0 12.5-2.5 17-7l33.3-33.3c16.9 5.4 35 8.3 53.7 8.3zM376 96a40 40 0 1 1 0 80 40 40 0 1 1 0-80z"/>`;

    return html`<svg class="icon private" viewBox="0 0 640 512">${path}</svg>`;
  }

  _iconStore() {
    const path = svg`<path d="M547.6 103.8L490.3 13.1C485.2 5 476.1 0 466.4 0H109.6C99.9 0 90.8 5 85.7 13.1L28.3 103.8c-29.6 46.8-3.4 111.9 51.9 119.4c4 .5 8.1 .8 12.1 .8c26.1 0 49.3-11.4 65.2-29c15.9 17.6 39.1 29 65.2 29c26.1 0 49.3-11.4 65.2-29c15.9 17.6 39.1 29 65.2 29c26.2 0 49.3-11.4 65.2-29c16 17.6 39.1 29 65.2 29c4.1 0 8.1-.3 12.1-.8c55.5-7.4 81.8-72.5 52.1-119.4zM499.7 254.9l-.1 0c-5.3 .7-10.7 1.1-16.2 1.1c-12.4 0-24.3-1.9-35.4-5.3V384H128V250.6c-11.2 3.5-23.2 5.4-35.6 5.4c-5.5 0-11-.4-16.3-1.1l-.1 0c-4.1-.6-8.1-1.3-12-2.3V384v64c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V384 252.6c-4 1-8 1.8-12.3 2.3z"/>`;

    return html`<svg class="icon store" viewBox="0 0 640 512">${path}</svg>`;
  }

  render() {
    let icon;
    switch (this.icon) {
      case "houseFlag":
        icon = this._iconHouseFlag();
        break;
      case "key":
        icon = this._iconKey();
        break;
      case "store":
        icon = this._iconStore();
        break;
      default:
        return "";
    }

    return icon;
  }
}

if (!customElements.get("alpaca-map-icon")) {
  customElements.define("alpaca-map-icon", AlpacaMapIcon);
}
