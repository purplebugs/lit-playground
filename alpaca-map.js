import { LitElement, html, css } from "lit";

export default class AlpacaMap extends LitElement {
  static properties = {
    key: { type: String },
    centerLat: { type: Number },
    centerLng: { type: Number },
  };

  static styles = [
    css`
      :host {
        display: block;
      }
      #map {
        top: 0;
        bottom: 0;
        height: 100%;
        width: 100%;
      }
    `,
  ];

  constructor() {
    super();
    this.key;
    this.map;
    this.centerLat = 64.5783089;
    this.centerLng = 17.888237;
    this.farms = [
      { lat: 22, lng: 22 },
      { lat: 63, lng: 103 },
      { lat: -20, lng: 80 },
    ];
  }

  // When element is connected to the DOM connectedCallback() is called.
  // This is needed in order to know the value of this.key which is passed in from the attribute

  connectedCallback() {
    super.connectedCallback();

    // This loads the google scripts.
    // We do this here, because at this point we have values from the attributes set on the element
    ((g) => {
      var h,
        a,
        k,
        p = "The Google Maps JavaScript API",
        c = "google",
        l = "importLibrary",
        q = "__ib__",
        m = document,
        b = window;
      b = b[c] || (b[c] = {});
      var d = b.maps || (b.maps = {}),
        r = new Set(),
        e = new URLSearchParams(),
        u = () =>
          h ||
          (h = new Promise(async (f, n) => {
            await (a = m.createElement("script"));
            e.set("libraries", [...r] + "");
            for (k in g)
              e.set(
                k.replace(/[A-Z]/g, (t) => "_" + t[0].toLowerCase()),
                g[k]
              );
            e.set("callback", c + ".maps." + q);
            a.src = `https://maps.${c}apis.com/maps/api/js?` + e;
            d[q] = f;
            a.onerror = () => (h = n(Error(p + " could not load.")));
            a.nonce = m.querySelector("script[nonce]")?.nonce || "";
            m.head.append(a);
          }));
      d[l]
        ? console.warn(p + " only loads once. Ignoring:", g)
        : (d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n)));
    })({ key: this.key, v: "weekly" });
  }

  // When element has rendered markup in the DOM firstUpdated() is called
  async firstUpdated() {
    // Set default location
    const position = { lat: this.centerLat, lng: this.centerLng };
    console.log("position", position);

    // Import Google Map scripts so we can use them
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    // Get the element in the shadow DOM to render the map in
    const el = this.renderRoot.querySelector("#map");

    // Construct the map and adjust what controls to show
    this.map = new Map(el, {
      zoom: 4,
      center: position,
      zoomControl: true,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
      mapId: "DEMO_MAP_ID",
    });

    // Place markers on the map

    this.farms.forEach((farm) => {
      const marker = new AdvancedMarkerElement({
        map: this.map,
        position: farm,
        title: "Alpaca Farm",
      });
    });

    const center = new AdvancedMarkerElement({
      map: this.map,
      position: position,
      title: "Center",
    });
  }

  render() {
    return html` <div id="map"></div> `;
  }
}

if (!customElements.get("alpaca-map")) {
  customElements.define("alpaca-map", AlpacaMap);
}
