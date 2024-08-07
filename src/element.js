import { LitElement, html, css } from "lit";
console.log("hello world from element.js");

export class AlpacaElement extends LitElement {
  static properties = {
    name: { type: String },
    counter: { type: Number },
  };

  static styles = [
    css`
      button {
        color: green;
      }

      .box {
        border: 1px solid black;
      }
    `,
  ];

  constructor() {
    super();
    this.name = "Chanel";
    this.counter = 0;
  }

  _increase() {
    this.counter++;
  }

  _title() {
    // Calling this._increase without parentheses ensures it is not run on page load, but only when the h3 element is clicked
    return html`<button @click="${this._increase}">
      Alpaca: ${this.name} - Counter: ${this.counter}
    </button>`;
  }

  render() {
    // Calling this._title() with parentheses ensures it is run every time the component is rendered, eg by default on page load
    return html`<div class="box">
      <header><slot name="header"></slot></header>

      <section>${this._title()}<slot></slot></section>

      <footer><slot name="footer"></slot></footer>
    </div>`;
  }
}

customElements.define("alpaca-element", AlpacaElement);
