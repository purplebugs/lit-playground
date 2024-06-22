import { LitElement, html } from "lit";
console.log("hello world from element.js");

export class AlpacaElement extends LitElement {
  static properties = {
    name: { type: String },
    counter: { type: Number },
  };

  constructor() {
    super();
    this.name = "Chanel";
    this.counter = 0;
  }

  _increase() {
    this.counter++;
  }

  render() {
    return html`<h3 @click="${this._increase}">Alpaca: ${this.name} - Counter: ${this.counter}</h3>`;
  }
}

customElements.define("alpaca-element", AlpacaElement);
