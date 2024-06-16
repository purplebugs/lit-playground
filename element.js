import { LitElement, html } from "lit";
console.log("hello world from element.js");

export class AlpacaElement extends LitElement {
  static properties = {
    name: { type: String },
  };

  constructor() {
    super();
    this.name = "Chanel";
  }

  render() {
    return html`<h3>Alpaca: ${this.name}</h3>`;
  }
}

customElements.define("alpaca-element", AlpacaElement);
