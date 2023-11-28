import { css } from '@emotion/react';

const fontPath = `/fonts/`;
const global = css`
  @font-face {
    font-family: Lato;
    src: url('${fontPath}Lato-Bold.woff') format('woff');
    font-weight: 800;
    font-display: swap;
  }
  @font-face {
    font-family: Lato;
    src: url('${fontPath}Lato-Semibold.woff') format('woff');
    font-weight: 700;
    font-display: swap;
  }
  @font-face {
    font-family: Lato;
    src: url('${fontPath}Lato-Regular.woff') format('woff');
    font-weight: 500;
    font-display: swap;
  }
  @font-face {
    font-family: Lato;
    src: url('${fontPath}Lato-Light.woff') format('woff');
    font-weight: 400;
    font-display: swap;
  }
  *,
  html,
  body,
  h1,
  h2,
  h3,
  h4,
  h5,
  p,
  article,
  aside,
  figcaption,
  figure {
    margin: 0;
    padding: 0;
    scrollbar-width: none;
  }
  @media only screen and (min-width: 1200px) {
    html {
      fontsize: 16px;
    }
  }
  @media only screen and (min-width: 1400px) {
    html {
      fontsize: 18px;
    }
  }
  @media only screen and (min-width: 1800px) {
    html {
      fontsize: 20px;
    }
  }
  a {
    text-decoration: none;
  }
  a:hover {
    text-decoration: none;
  }
  body {
    font-family: Lato;
    font-weight: normal;
    height: -webkit-fill-available;
    max-height: -moz-available;
    max-height: -webkit-fill-available;
    max-height: fill-available;
    overflow: hidden;
  }
  ::-webkit-scrollbar {
    display: none;
    width: 0;
  }
  .pincode-input-container {
    display: flex !important;
    justify-content: space-between !important;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  @media only screen and (min-device-width: 720px) {
    #zsiqbtn,
    #zohoSupport {
      display: none !important;
    }
    .card-exclusive-image {
      padding: 2.1875rem 5.5rem !important;
    }
    .fullscreen-modal {
      position: fixed !important;
      top: 0;
      width: var(--hocWidth) !important;
    }
    .fullscreen-modal-overlay {
      width: var(--hocWidth);
    }
    .fullscreen-sheet {
      width: var(--hocWidth);
    }

    .bottom-sheet {
      width: var(--hocWidth);
    }
    .purchase-button-container {
      width: var(--hocWidth) !important;
    }
    .mToast-container {
      width: calc(var(--hocWidth) - 20px) !important;
      position: relative;
      top: var(--containerHeight);
    }
    .modal-container {
      /* top: var(--containerHeight);
      bottom: var(--containerHeight); */
      /* left: 50%;
      right: 50%;
      transform: translateX(-50%) !important; */
    }
  }
  @media only screen and (min-device-width: 400px) and (max-device-width: 600px) {
    .card-exclusive-image {
      padding: 2.1875rem 2.5rem !important;
    }
  }
  @media only screen and (max-width: 428px) {
    #zsiqbtn {
      display: inline-block;
    }
    .purchase-button-container {
      width: var(--hocWidth);
      position: fixed !important;
      bottom: 0;
    }
    .modal-container {
      top: 0 !important;
      bottom: 0 !important;
      transform: none;
    }
  }
  /* Firefox */
  input[type='number'] {
    -moz-appearance: textfield;
  }

  .zsiq_flt_rel1.siqico-chat:before {
    border-color: #0066cc;
    color: #0066cc;
  }

  .zsiq_float1 {
    width: 100%;
    padding: 0 1rem !important;
    z-index: auto !important;
  }

  .zsiq_flt_rel1 {
    width: 100% !important;
  }

  .zsiq_float1 .zsiq_flt_rel1 {
    border-color: #fdd73f !important;
  }
  .zls-sptwndw {
    position: relative;
    max-width: 425px !important;
    margin: 0 auto;
    top: 0;
  }
  .swiper-horizontal.swiper-css-mode > .swiper-wrapper {
    scroll-snap-type: unset;
    -ms-scroll-snap-type: unset;
  }
  #popover-trigger-hover-focus {
    z-index: 999999;
    background: #2e3648;
    font-size: 12px;
    font-weight: 500;
    line-height: 18px;
    font-family: 'Lato';
    padding: 12px;
    color: #fff;
    max-width: 180px;
  }
  .bs-popover-auto[data-popper-placement^='right'] > .popover-arrow::after,
  .bs-popover-end > .popover-arrow::after {
    border-right-color: #2e3648;
  }
  #intercom-container .intercom-app .intercom-messenger-frame {
    height: 100%;
    width: 100%;
    width: 428px;
    max-height: 90vh;
    left: 20px;
    margin: auto;
    top: var(--containerHeight);
    bottom: var(--containerHeight);
  }
  #intercom-container .intercom-app iframe.intercom-borderless-frame,
  #intercom-container .intercom-app [name='intercom-notifications-frame'] {
    display: none !important;
  }
  @media only screen and (max-width: 428px) {
    #intercom-container .intercom-app .intercom-messenger-frame {
      left: 0;
      width: 100vw;
      max-height: 100vh;
    }
  }
  @media only screen and (min-width: 429px) {
    #intercom-container .intercom-app .intercom-messenger-frame {
      height: 926px;
    }
  }
`;

export default global;
