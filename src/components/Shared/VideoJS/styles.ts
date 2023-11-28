import { css } from '@emotion/react';
import { colors, utils } from '@styles/shared';

export const vjsMatrix = css`
  .vjs-big-play-button {
    border-radius: 100%;
    width: ${utils.remConverter(42)};
    aspect-ratio: 1/1;
    background: ${colors.BACK_BUTTON_BORDER};
    border: none;
    left: 50%;
    top: 50%;
    margin-left: ${-(40 / 2)}px;
    margin-top: ${-(40 / 2)}px;
  }
  .video-js .vjs-big-play-button .vjs-icon-placeholder:before {
    background: ${colors.Primary_Blue};
    width: ${utils.remConverter(42)};
    border-radius: 100%;
  }
  .vjs-control-bar {
    background: none;
    position: absolute;
    top: 0;
    bottom: 0;
    height: 100%;
    align-items: flex-end;
  }
  .video-js .vjs-picture-in-picture-control {
    display: none;
  }
  .video-js .vjs-fullscreen-control {
    height: ${utils.remConverter(23)};
    width: ${utils.remConverter(50)};
    position: absolute;
    top: 0;
    right: 0;
  }
  .video-js .vjs-fullscreen-control .vjs-icon-placeholder:before {
    font-size: ${utils.remConverter(48)};
    line-height: normal;
  }
  .video-js .vjs-volume-panel {
    display: none;
  }
  .video-js .vjs-progress-control {
    align-items: flex-end;
    padding-bottom: ${utils.remConverter(20)};
    height: ${utils.remConverter(40)};
  }
  .video-js .vjs-play-control {
    position: absolute;
    top: 40%;
    left: 43%;
    height: 40px;
    background: ${colors.Primary_Blue};
    border-radius: 100%;
    width: ${utils.remConverter(42)};
    aspect-ratio: 1/1;
  }
  .video-js .vjs-play-control .vjs-icon-placeholder:before {
    position: absolute;
    top: ${utils.remConverter(-4)};
    width: ${utils.remConverter(42)};
    border-radius: 100%;
    font-size: ${utils.remConverter(30)};
    color: ${colors.Secondary_White};
  }
  .video-js .vjs-slider {
    background-color: ${colors.Grey_Border};
  }
  .video-js .vjs-play-progress {
    background-color: ${colors.Primary_Blue};
  }
  .video-js .vjs-progress-holder {
    height: ${utils.remConverter(6)};
    border-radius: ${utils.remConverter(5)};
  }
  .video-js .vjs-progress-holder .vjs-load-progress div {
    border-radius: ${utils.remConverter(5)};
  }
  .video-js .vjs-progress-holder .vjs-play-progress {
    border-radius: ${utils.remConverter(5)};
  }
  .video-js .vjs-progress-holder .vjs-load-progress {
    border-radius: ${utils.remConverter(5)};
  }
  .video-js .vjs-play-progress:before {
    height: ${utils.remConverter(12)};
    width: ${utils.remConverter(12)};
    background-color: ${colors.Primary_Blue};
    box-shadow: ${colors.Shadow_Btn_S_Outer_Smooth};
    border-radius: 100%;
    color: ${colors.Primary_Blue};
    content: ' ';
  }
  .video-js .vjs-control:focus {
    text-shadow: none;
  }
  .video-js .vjs-tech {
    border-radius: ${utils.remConverter(4)};
  }
  .video-js.vjs-fluid:not(.vjs-audio-only-mode) {
    border-radius: ${utils.remConverter(4)};
  }
`;
