import { compareExact, compareSparse } from "./utils.js";
import { LitElement, html, css } from "lit";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { Loader } from "@googlemaps/js-api-loader";

import STYLED_MAP_TYPE from "./styles-map.js";
import stylesMapMarker from "./styles-map-marker.js";
import "./alpaca-map-marker.js";
import "./alpaca-map-icon.js";

export default class AlpacaMap extends LitElement {
  static properties = {
    apiKey: { type: String },
    centerLat: { type: Number },
    centerLng: { type: Number },
    dataSource: { type: String },
    assetSource: { type: String },
    linkToFarmPage: { type: Boolean },
  };

  static styles = [
    css`
      /********* Overall layout *********/
      :host {
        background-color: white;
        display: inline-block;
        border: 1px solid black;

        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto 5fr 1fr;
        grid-column-gap: 0px;
        grid-row-gap: 0px;

        /* Ref: https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design#responsive_typography */
        /* font-size: calc(1.5rem + 3vw); */

        /* Sets a min font size, ie the max of the two values, so sets a floor for the size */
        /*         
        font-size: max(5vw, 10px); 
        */

        /* alpaca.life logo colours */
        --hex-dark-blue: #285dab;
        --rgb-dark-blue: 40 93 171;
        --dark-blue: rgb(var(--rgb-dark-blue));

        --hex-pale-blue: #3d78ce;
        --rgb-pale-blue: 61, 120, 206;
        --pale-blue: rgb(var(--rgb-pale-blue));

        --hex-yellow: #edbb34;
        --rgb-yellow: 237 187 52;
        --yellow: rgb(var(--rgb-yellow));

        --hex-pink: #ed87a1;
        --rgb-pink: 237 135 161;
        --pink: rgb(var(--rgb-pink));

        /* From me */
        --almost-black: #333333;
        --grey: #666666;
        --brown: #83580b;
        --green: #7a9a01; /* Pantone 377 C - from my chair */

        --private-farm: var(--brown);
        --public-farm: var(--green);

        /* From fontawesome website design */
        --rgb-gray-50: 240 241 243;
        --rgb-gray-100: 224 226 232;
        --rgb-gray-200: 195 198 209;
        --rgb-gray-300: 165 171 187;
        --rgb-gray-400: 165 171 187;
        --rgb-gray-500: 97 109 138;
        --rgb-gray-600: 81 94 123;
        --rgb-gray-700: 54 71 103;
        --rgb-gray-800: 24 49 83;
        --rgb-gray-900: 0 28 64;
        --white: var(--oc-white);
        --black: var(--oc-black);
        --gray-50: rgb(var(--rgb-gray-50));
        --gray-100: rgb(var(--rgb-gray-100));
        --gray-200: rgb(var(--rgb-gray-200));
        --gray-300: rgb(var(--rgb-gray-300));
        --gray-400: rgb(var(--rgb-gray-400));
        --gray-500: rgb(var(--rgb-gray-500));
        --gray-600: rgb(var(--rgb-gray-600));
        --gray-700: rgb(var(--rgb-gray-700));
        --gray-800: rgb(var(--rgb-gray-800));
        --gray-900: rgb(var(--rgb-gray-900));
      }

      /* Custom minimalistic scrollbar */
      ::-webkit-scrollbar {
        width: 20px;
      }

      ::-webkit-scrollbar-track {
        background-color: transparent;
      }

      ::-webkit-scrollbar-thumb {
        background-color: #d6dee1;
        border-radius: 20px;
        border: 6px solid transparent;
        background-clip: content-box;
      }

      ::-webkit-scrollbar-thumb:hover {
        background-color: #a8bbbf;
      }

      .header-container {
        background-color: white;
        overflow: hidden;
        padding: 0.25em 0em 0.25em 0em;
      }

      .map-container {
        background-color: lightgreen;
      }

      .footer-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.5em 0.25em 0.5em 0.25em;

        background-color: white;

        p {
          margin: 0px;
        }

        .footer-message {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          text-align: center;
        }

        #ko-fi {
          border: solid var(--pink) 0.15em;
          border-radius: 10em;
        }
      }

      /********* Links *********/

      a {
        color: var(--dark-blue);
      }

      a:hover {
        color: var(--pale-blue);
        text-decoration: underline;
        text-decoration-thickness: 0.5em;
      }

      /********* Toggles *********/

      form {
        margin: 0;
        padding: 0;
      }

      .toggle-group {
        /* Scroll across for more toggles*/
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        overflow: auto;
        box-sizing: border-box;
      }

      .toggle {
        flex: 0 0 auto;
        color: #006ce4;
        background-color: rgba(0, 108, 228, 0.06);
        border: solid #006ce4 0.15em;
        box-shadow: 0 2px 8px 0 rgba(26, 26, 26, 0.16);

        border-radius: 10em;
        padding: 0.5em;
        margin: 0.25em;

        display: inline-flex;
        align-items: center;
        justify-content: center;

        label {
          white-space: nowrap;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        input[type="checkbox"] {
          margin: 0em 0.4em 0em 0.1em;
          width: 1.5em;
          height: 1.5em;
        }

        input:checked {
          outline: 0.1em solid white;
          accent-color: red;
        }
      }

      /********* Map *********/

      #map {
        height: 100%;
        width: 100%;
        background-color: var(--pale-blue);
      }
    `,
    stylesMapMarker,
  ];

  constructor() {
    super();
    this.map;
    this.apiKey = "";
    this.centerLat = 60.472;
    this.centerLng = 8.4689;
    this.dataSource = "http://localhost:3000/api/companies"; // TODO set default depending on environment
    this.assetSource = "https://www.alpaca.life/assets";
    this.linkToFarmPage = true;

    this.farms = [];
    this.cluster = null;
  }

  connectedCallback() {
    super.connectedCallback();

    console.log("Using the followig ApiKey", this.apiKey);

    // Ref; https://developers.google.com/maps/documentation/javascript/load-maps-js-api#js-api-loader
    const loader = new Loader({
      apiKey: this.apiKey,
      version: "weekly",
    });

    loader.load().then(async () => {
      await this.initMap();
    });
  }

  // When element has rendered markup in the DOM firstUpdated() is called
  async initMap() {
    async function fetchFarms(dataSource) {
      let arr = [];
      try {
        const response = await fetch(dataSource);
        const farms = await response.json();
        // console.log("farms", farms);

        arr = farms?.items || [];
      } catch (error) {}
      return arr;
    }

    // Set default location
    const center = { lat: this.centerLat, lng: this.centerLng };

    // Import Google Map scripts so we can use them
    const { Map, InfoWindow } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    // Load data to populate the map
    this.farms = await fetchFarms(this.dataSource);

    // Get the element in the shadow DOM to render the map in
    const el = this.renderRoot.querySelector("#map");

    // Construct the map and adjust what controls to show
    this.map = new Map(el, {
      zoom: 4,
      center: center,
      zoomControl: true,
      mapTypeControl: false,
      scaleControl: true,
      streetViewControl: true,
      rotateControl: true,
      fullscreenControl: true,
      mapId: "ALPACA_MAP_ID",
    });

    // Ref: Google map style
    // https://developers.google.com/maps/documentation/javascript/examples/maptype-styled-simple
    // Create a new StyledMapType object, passing it an array of styles,
    // and the name to be displayed on the map type control.
    const styledMapType = new window.google.maps.StyledMapType(
      STYLED_MAP_TYPE,
      { name: "Alpaca Styled Map" }
    );

    // Associate the styled map with the MapTypeId and set it to display.
    this.map.mapTypes.set("styled_map", styledMapType);
    this.map.setMapTypeId("styled_map");

    let zIndexMax = Number(10000000);

    const markers = this.farms.map((farm) => {
      const content = document.createElement("alpaca-map-marker");
      content.setAttribute("linkToFarmPage", this.linkToFarmPage);

      content.setAttribute("id", farm?.id);
      content.setAttribute("name", farm?.name);
      content.setAttribute(
        "category",
        farm?.category?.private ? "private" : "public"
      );
      content.setAttribute("count", farm?.count?.alpacas?.status?.active);
      content.setAttribute("city", farm?.city);
      content.setAttribute(
        "address",
        farm?.location?.google?.formatted_address
      );

      content.setAttribute("url_full", farm?.url?.full);
      content.setAttribute("url_pretty", farm?.url?.pretty);

      content.setAttribute(
        "directions",
        farm?.location?.google?.directions_url_href
      );
      content.setAttribute("highlight", "false");

      const marker = new AdvancedMarkerElement({
        content,
        position: farm.location.lat_lng,
        title: farm?.name,
        zIndex: zIndexMax,
      });

      // markers can only be keyboard focusable when they have click listeners

      // toggle marker summary/details when marker is clicked
      marker.addListener("click", () => {
        const highlighted = marker.content.getAttribute("highlight");
        zIndexMax = Number(zIndexMax + 1);

        if (highlighted === "true") {
          marker.content.setAttribute("highlight", "false");
        } else {
          marker.zIndex = Number(zIndexMax);
          marker.content.setAttribute("highlight", "true");
        }
      });

      farm._marker = marker;

      return marker;
    });

    // Add a marker clusterer to manage the markers.
    this.cluster = new MarkerClusterer({
      map: this.map,
      algorithmOptions: {
        radius: 100,
      },
    });
    this.cluster.addMarkers(markers);
  }

  _filterMarkers(element) {
    const form = new FormData(element.currentTarget);

    const templatePublicPrivate = {
      public: form.get("public") === "on",
      private: form.get("private") === "on",
    };

    // Build up object with user selected values
    const templateSelected = {};

    for (const key of form.keys()) {
      if (key !== "private" && key !== "public") {
        templateSelected[key] = true;
      }
    }

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
  }

  render() {
    return html`
      <header class="header-container">
        <form id="form" @change="${this._filterMarkers}">
          <div class="toggle-group">
            <span class="toggle">
              <input type="checkbox" id="public" name="public" checked />
              <label for="public">
                <alpaca-map-icon icon="houseFlag"></alpaca-map-icon>Public
                farms</label
              >
            </span>

            <span class="toggle">
              <input type="checkbox" id="private" name="private" checked />
              <label for="private"
                ><alpaca-map-icon icon="key"></alpaca-map-icon>Private
                farms</label
              >
            </span>

            <span class="toggle">
              <input type="checkbox" id="alpacaSales" name="alpacaSales" />
              <label for="alpacaSales"
                ><alpaca-map-icon icon="handShake"></alpaca-map-icon>Alpaca
                sales</label
              >
            </span>

            <span class="toggle">
              <input type="checkbox" id="alpacaWalking" name="alpacaWalking" />
              <label for="alpacaWalking"
                ><alpaca-map-icon icon="personHiking"></alpaca-map-icon>Alpaca
                walking</label
              >
            </span>

            <span class="toggle">
              <input type="checkbox" id="bookable" name="bookable" />
              <label for="bookable"
                ><alpaca-map-icon icon="calendarCheck"></alpaca-map-icon
                >Bookable</label
              >
            </span>

            <span class="toggle">
              <input type="checkbox" id="shop" name="shop" />
              <label for="shop"
                ><alpaca-map-icon icon="store"></alpaca-map-icon>Shop</label
              >
            </span>

            <span class="toggle">
              <input type="checkbox" id="overnightStay" name="overnightStay" />
              <label for="overnightStay"
                ><alpaca-map-icon icon="bed"></alpaca-map-icon>Overnight
                stay</label
              >
            </span>

            <span class="toggle">
              <input type="checkbox" id="studServices" name="studServices" />
              <label for="studServices"
                ><alpaca-map-icon icon="mars"></alpaca-map-icon>Stud
                services</label
              >
            </span>
          </div>
        </form>
      </header>

      <div class="map-container" id="map"></div>

      <footer class="footer-container">
        <div>
          <a
            href="https://www.alpaca.life"
            target="_blank"
            data-testid="link-logo"
            ><img
              src="${this.assetSource}/images/alpaca.life.logo.png"
              width="100px"
              height="100px"
              alt="Alpaca Life logo"
          /></a>
        </div>
        <div class="footer-message">
          Find alpacas,<br />
          farms and more:<br />
          <a href="https://www.alpaca.life" target="_blank">www.alpaca.life</a>
        </div>
        <div>
          <a
            href="https://ko-fi.com/anitalipsky"
            target="_blank"
            data-testid="link-support"
            ><img
              id="ko-fi"
              src="${this.assetSource}/images/kofi_bg_tag_white.svg"
              width="100px"
              alt="Buy me a ko-fi"
          /></a>
        </div>
      </footer>
    `;
  }
}

if (!customElements.get("alpaca-map")) {
  customElements.define("alpaca-map", AlpacaMap);
}
