import { compareExact, compareSparse } from "./utils";
import { LitElement, html, css } from "lit";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import stylesGoogle from "./styles-google";
import {
  iconStyles,
  iconBed,
  iconCalendarCheck,
  iconHandshake,
  iconHouseFlag,
  iconKey,
  iconMars,
  iconPersonHiking,
  iconStore,
} from "./svg-icons";

export default class AlpacaMap extends LitElement {
  static properties = {
    key: { type: String },
    centerLat: { type: Number },
    centerLng: { type: Number },
  };

  static styles = [
    stylesGoogle,
    iconStyles,
    css`
      /********* Overall layout *********/

      :host {
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

        --hex-brown: #83580b;
        --rgb-brown: 133, 90, 10;
        --brown: rgb(var(--rgb-brown));

        /* Pantone 377 C - from my chair */
        --hex-green: #7a9a01;
        --rgb-green: 119, 152, 1;
        --green: rgb(var(--rgb-green));
      }

      .web-component-container {
        border: 1px solid black;
      }

      .header-container {
        background-color: white;
        padding: 0.5em;
      }

      .map-container {
        background-color: lightgreen;
      }

      .footer-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.5em 0.5em 0.5em 0.5em;

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

        width: 100%;
        box-sizing: border-box;
      }

      .toggle {
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

        .icon {
          padding: 0 0.1em 0 0.1em;
        }

        svg {
          font-size: 1.5em;

          path {
            fill: currentcolor;
          }
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
        width: auto;
        background-color: var(--pale-blue);
      }

      .farm {
        display: flex;
        align-items: center;
        justify-content: center;

        background-color: white;
        border: 0.2em solid var(--green); /* TODO change colour for public/private */
        border-radius: 1rem;
        box-shadow: 10px 10px 5px #0003;
        color: var(--almost-black);
        padding: 0.75rem;

        width: auto;
        max-width: 15rem;

        .summary {
          display: flex;
          align-items: center;
          justify-content: center;

          font-size: 1.5rem;
          gap: 0.5rem;
        }

        ::after {
          border-left: 9px solid transparent;
          border-right: 9px solid transparent;
          border-top: 9px solid var(--green); /* TODO change colour for public/private */
          content: "";
          height: 0;
          left: 50%;
          position: absolute;
          top: 100%;
          transform: translate(-50%);
          width: 0;
          z-index: 1;
        }
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
      scaleControl: true,
      streetViewControl: true,
      rotateControl: true,
      fullscreenControl: true,
      mapId: "ALPACA_MAP_ID",
    });

    // const infoWindow = new InfoWindow({
    //   content: "",
    //   disableAutoPan: true,
    // });

    // Add markers to the map

    function buildContent(farm) {
      const content = document.createElement("div");
      content.classList.add("farm");

      // const icon = farm?.category?.private ? "Private" : "Public";

      content.innerHTML = `
    <div class="summary">
     <div class="icon">${iconHouseFlag().svgString}</div>
     <div class="count">${farm?.count?.alpacas?.status?.active} 🦙</div>
    </div>
    `;

      return content;
    }

    const markers = this.farms.map((farm) => {
      const marker = new AdvancedMarkerElement({
        content: buildContent(farm),
        position: farm.location.lat_lng,
        title: farm?.name,
      });

      // markers can only be keyboard focusable when they have click listeners
      /*       // open info window when marker is clicked
      marker.addListener("click", () => {
        infoWindow.setContent(
          farm.location.lat_lng.lat +
            ", " +
            farm.location.lat_lng.lng +
            " Count: " +
            farm?.count?.alpacas?.status?.active
        );
        infoWindow.open(this.map, marker);
      }); */

      farm._marker = marker;

      return marker;
    });

    // Add a marker clusterer to manage the markers.
    this.cluster = new MarkerClusterer({ map: this.map });
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

    console.log("markers.length", markers.length);
  }

  render() {
    return html`
      <section class="web-component-container">
        <header class="header-container">
          <form id="form" @change="${this._filterMarkers}">
            <div class="toggle-group">
              <span class="toggle">
                <input type="checkbox" id="public" name="public" checked />
                <label for="public">
                  ${iconHouseFlag().htmlObject}Public farms</label
                >
              </span>

              <span class="toggle">
                <input type="checkbox" id="private" name="private" checked />
                <label for="private"
                  >${iconKey().htmlObject}Private farms</label
                >
              </span>

              <span class="toggle">
                <input type="checkbox" id="alpacaSales" name="alpacaSales" />
                <label for="alpacaSales"
                  >${iconHandshake().htmlObject}Alpaca sales</label
                >
              </span>

              <span class="toggle">
                <input
                  type="checkbox"
                  id="alpacaWalking"
                  name="alpacaWalking"
                />
                <label for="alpacaWalking"
                  >${iconPersonHiking().htmlObject}Alpaca walking</label
                >
              </span>

              <span class="toggle">
                <input type="checkbox" id="bookable" name="bookable" />
                <label for="bookable"
                  >${iconCalendarCheck().htmlObject}Bookable</label
                >
              </span>

              <span class="toggle">
                <input type="checkbox" id="shop" name="shop" />
                <label for="shop">${iconStore().htmlObject}Shop</label>
              </span>

              <span class="toggle">
                <input
                  type="checkbox"
                  id="overnightStay"
                  name="overnightStay"
                />
                <label for="overnightStay"
                  >${iconBed().htmlObject}Overnight stay</label
                >
              </span>

              <span class="toggle">
                <input type="checkbox" id="studServices" name="studServices" />
                <label for="studServices"
                  >${iconMars().htmlObject}Stud services</label
                >
              </span>
            </div>
          </form>
        </header>
        <div class="map-container">
          <div id="map"></div>
        </div>
        <footer class="footer-container">
          <div>
            <a
              href="https://www.alpaca.life"
              target="_blank"
              data-testid="link-logo"
              ><img
                src="/assets/images/alpaca.life.logo.png"
                width="100px"
                height="100px"
                alt="Alpaca Life logo"
            /></a>
          </div>
          <div class="footer-message">
            Find alpacas,<br />
            farms and more:<br />
            <a href="https://www.alpaca.life" target="_blank"
              >www.alpaca.life</a
            >
          </div>
          <div>
            <a
              href="https://ko-fi.com/anitalipsky"
              target="_blank"
              data-testid="link-support"
              ><img
                id="ko-fi"
                src="/assets/images/kofi_bg_tag_white.svg"
                width="100px"
                alt="Buy me a ko-fi"
            /></a>
          </div>
        </footer>
      </section>
    `;
  }
}

if (!customElements.get("alpaca-map")) {
  customElements.define("alpaca-map", AlpacaMap);
}
