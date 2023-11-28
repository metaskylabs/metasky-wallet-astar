import { colors, mixins, utils } from '@styles/shared';
import { css } from '@emotion/react';
import { mqMinWidth } from '@styles/shared/mediaQueries';

export const bottomSheetPopup = css([
  {
    display: `block`,
    position: `fixed`,
    top: `var(--containerHeight)`,
    bottom: `var(--containerHeight)`,
    zIndex: 19,
  },
  // { ...mixins.modalContainer },
]);

export const visible = css({
  opacity: 1,
  transition: `all 300ms ease-in-out`,
});

export const notVisible = css({
  display: `none`,
});

export const backDrop = css([
  {
    position: `fixed`,
    top: 0,
    bottom: `0`,
    background: `rgba(0, 0, 0, 0.6)`,
    width: `var(--hocWidth)`,
    backdropFilter: `blur(20px)`,
    [mqMinWidth[5]]: {
      top: `var(--containerHeight)`,
      bottom: `var(--containerHeight)`,
    },
  },
]);

export const closeBtn = css({
  position: `absolute`,
  top: `27px`,
  right: `16px`,
  cursor: `pointer`,
});

export const bottomSheetBody = css({
  position: `absolute`,
  bottom: 0,
  left: `0`,
  right: `0`,
  width: `var(--hocWidth)`,
  background: colors.Primary_Bg_Grey,
  boxShadow: colors.Shadow_Bg_Outer_Sharp,
  borderRadius: `${utils.remConverter(20)} ${utils.remConverter(20)} 0 0`,
  maxHeight: `100%`,
  display: `flex`,
  flexDirection: `column`,
});

export const headingSpacing = css({
  padding: `${utils.remConverter(20)} ${utils.remConverter(
    16,
  )} ${utils.remConverter(18)}`,
  marginBottom: 0,
});

export const childWrapper = css({
  overflowY: `auto`,
  flex: 1,
});

export const sizeBig = css({
  top: `10%`,
});
export const sizeMedium = css({
  height: utils.remConverter(530),
});
