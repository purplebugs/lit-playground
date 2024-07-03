import { LitElement, html, css } from "lit";
import { MarkerClusterer } from "@googlemaps/markerclusterer";

function compareExact(template, obj) {
  let templateKeys = Object.keys(template);

  if (templateKeys.length === Object.keys(obj).length) {
    return templateKeys.every(
      (key) => obj.hasOwnProperty(key) && obj[key] === template[key]
    );
  }
  return false;
}

function compareSparse(template, obj) {
  let templateKeys = Object.keys(template);

  return templateKeys.every(
    (key) => obj.hasOwnProperty(key) && obj[key] === template[key]
  );
}

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
    this.centerLat = 60.472;
    this.centerLng = 8.4689;
    this.farms = [];
    this.cluster = null;
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
    async function fetchFarms() {
      const response = await fetch("http://localhost:3000/api/companies"); // TODO set host to correct environment
      const farms = await response.json();
      console.log("farms", farms);

      return farms?.items || [];
    }

    // Set default location
    const center = { lat: this.centerLat, lng: this.centerLng };
    console.log("center", center);

    // Load data to populate the map
    this.farms = await fetchFarms();

    // Import Google Map scripts so we can use them
    const { Map, InfoWindow } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    // Get the element in the shadow DOM to render the map in
    const el = this.renderRoot.querySelector("#map");

    // Construct the map and adjust what controls to show
    this.map = new Map(el, {
      zoom: 4,
      center: center,
      zoomControl: true,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
      mapId: "ALPACA_MAP_ID",
    });

    const infoWindow = new google.maps.InfoWindow({
      content: "",
      disableAutoPan: true,
    });

    // Add markers to the map

    const markers = this.farms.map((farm) => {
      const marker = new google.maps.marker.AdvancedMarkerElement({
        position: farm.location.lat_lng,
      });

      // markers can only be keyboard focusable when they have click listeners
      // open info window when marker is clicked
      marker.addListener("click", () => {
        infoWindow.setContent(
          farm.location.lat_lng.lat + ", " + farm.location.lat_lng.lng
        );
        infoWindow.open(this.map, marker);
      });

      farm._marker = marker;

      return marker;
    });

    // Add a marker clusterer to manage the markers.
    this.cluster = new MarkerClusterer({ map: this.map });
    this.cluster.addMarkers(markers);
  }

  _filterMarkers(element) {
    const form = new FormData(element.target.parentElement);

    const templatePublicPrivate = {
      public: form.get("public") === "on",
      private: form.get("private") === "on",
    };

    // Build up object with user selected values
    const templateSelected = {};

    for (const key of form.keys()) {
      if (key !== "private" && key !== "public") {
        console.log(key);
        templateSelected[key] = true;
      }
    }

    console.log("templateSelected", templateSelected);

    const markers = this.farms
      .filter((farm) => {
        if (templatePublicPrivate?.public && templatePublicPrivate?.private) {
          return true;
        }

        const obj = {
          public: farm?.category?.public,
          private: farm?.category?.private,
        };

        return compareExact(templatePublicPrivate, obj);
      })
      .filter((farm) => {
        return compareSparse(templateSelected, farm?.category);
      })

      .map((farm) => {
        return farm._marker;
      });

    this.cluster.clearMarkers();
    this.cluster.addMarkers(markers);

    console.log(markers.length);
  }

  render() {
    return html`
      <header>
        <form id="form" @change="${this._filterMarkers}">
          <input type="checkbox" id="public" name="public" checked />
          <label for="public">Public farms</label>

          <input type="checkbox" id="private" name="private" checked />
          <label for="private">Private farms</label>

          <input type="checkbox" id="alpacaSales" name="alpacaSales" />
          <label for="alpacaSales">Alpaca sales</label>

          <input type="checkbox" id="alpacaWalking" name="alpacaWalking" />
          <label for="alpacaWalking">Alpaca walking</label>

          <input type="checkbox" id="bookable" name="bookable" />
          <label for="bookable">Bookable</label>

          <input type="checkbox" id="shop" name="shop" />
          <label for="shop">Shop</label>

          <input type="checkbox" id="overnightStay" name="overnightStay" />
          <label for="overnightStay">Overnight stay</label>

          <input type="checkbox" id="studServices" name="studServices" />
          <label for="studServices">Stud services</label>
        </form>
      </header>
      <div id="map"></div>
    `;
  }
}

if (!customElements.get("alpaca-map")) {
  customElements.define("alpaca-map", AlpacaMap);
}
