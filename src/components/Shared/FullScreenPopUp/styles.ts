import { css } from '@emotion/react';
import { colors, mixins, utils } from '@styles/shared';
import { mqMinWidth } from '@styles/shared/mediaQueries';

export const backDrop = css([
  {
    background: colors.Primary_Bg_Grey,
    backdropFilter: `blur(20px)`,
    position: `fixed`,
    top: `0`,
    width: `var(--hocWidth)`,
    display: `none`,
    zIndex: 20,
    [mqMinWidth[5]]: {
      top: `var(--containerHeight)`,
      bottom: `var(--containerHeight)`,
      maxHeight: `90vh`,
    },
  },
  { ...mixins.desktopHeight },
  { ...mixins.desktopMaxHeight },
]);

export const OverlayContainer = css([
  {
    position: `fixed`,
    top: `0`,
    width: `var(--hocWidth)`,
    alignItems: `center`,
    justifyContent: `center`,
    display: `none`,
    zIndex: 20,
    overflowY: `scroll`,
    height: `100%`,
    backgroundColor: colors.Primary_Bg_Grey,
    [mqMinWidth[5]]: {
      top: `var(--containerHeight)`,
      bottom: `var(--containerHeight)`,
      maxHeight: `90vh`,
    },
  },
  { ...mixins.desktopHeight },
  { ...mixins.desktopMaxHeight },
  `max-height: -moz-available;
   max-height: -webkit-fill-available;
   max-height: fill-available;`,
]);

export const container = css({
  padding: utils.remConverter(40),
  background: colors.Primary_Bg_Grey,
  borderRadius: 8,
  position: `relative`,
  width: `80%`,
  height: `80%`,
});

export const openOverlay = css({
  display: `block`,
});

export const splashScreenStyles = css({ display: `flex !important` });
