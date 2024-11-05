import { css } from "lit";

/**
 *  Map marker styling
 *
 *  Ref: https://developers.google.com/maps/documentation/javascript/advanced-markers/html-markers#maps_advanced_markers_html-css
 *
 */

export default css`
  .farm-marker {
    padding: 0.75rem;
    background-color: white;
    color: var(--almost-black);
    transition: all 0.3s ease-out;
    width: auto;
    max-width: 15rem;
    border-radius: 1rem;
    border-width: 0.2rem;
    border-style: solid;

    &.public {
      border-color: var(--public-farm);
    }

    &.private {
      border-color: var(--private-farm);
    }

    .summary {
      display: flex;
      gap: 0.5rem;
      align-items: center;
      font-size: 1.5rem;
    }

    .count {
      font-weight: bolder;
    }

    .more-info {
      display: flex;
      border-radius: 0.5rem;
      flex: 1;
      flex-direction: column;

      &:not(.highlight) {
        display: none;
      }
    }

    .city {
      border-radius: 10px;
      padding: 0.2rem 0.5rem;
      border: 1px solid var(--gray-100);
      max-width: fit-content;
    }

    .address {
      font-size: 1rem;
      font-style: normal;
      margin-top: 1rem;
    }

    .farm-marker-link {
      font-size: 1rem;
      font-style: normal;
      margin: 1rem 0 0.5rem 0;
      border-radius: 1rem;
      padding: 1rem 0.5rem;
      border: 0.125rem solid var(--gray-500);
      box-shadow: 0 0.25rem 0 0.125rem var(--gray-200);

      .text {
        margin: 0 0 0 1rem;
      }
    }

    .farm-marker-link:hover {
      border-color: var(--pink);
      box-shadow: 0 0.25rem 0 0.125rem var(--gray-400);
    }

    .directions,
    .city address {
      display: flex;
      flex-basis: auto;
      align-items: center;
      padding: 0 0.25rem 0 0;
    }

    /* Icons */

    .icon {
      &.link-arrow {
        margin-left: 0.5rem;
      }
    }

    &.public .icon {
      color: var(--green);
    }

    &.private .icon {
      color: var(--brown);
    }
  }

  .farm-marker::after {
    /* Pointer under farm marker - taken from css in https://developers.google.com/maps/documentation/javascript/advanced-markers/html-markers*/
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    content: "";
    height: 0;
    left: 50%;
    position: absolute;
    top: 100%;
    transform: translateX(-50%) translateY(calc(0.1em * -1));
    /* translateY inspired from hotels.com */
    width: 0;
  }

  .farm-marker.public::after {
    border-top: 8px solid var(--green);
  }

  .farm-marker.private::after {
    border-top: 8px solid var(--brown);
  }
`;
