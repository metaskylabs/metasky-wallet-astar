import { colors, mixins, utils } from '@styles/shared';
import { css } from '@emotion/react';
import { mqMinWidth } from '@styles/shared/mediaQueries';

export const bottomSheetPopup = css([
  {
    display: `block`,
    position: `fixed`,
    top: `0`,
    bottom: `0`,
    zIndex: 20,
  },
  // { ...mixins.modalContainer },
]);

export const visibile = css({
  opacity: 1,
  transition: `all 300ms ease-in-out`,
});

export const notVisibile = css({
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
  zIndex: 1,
});

export const bottomSheetBody = css([
  {
    position: `absolute`,
    bottom: 0,
    left: `0`,
    right: `0`,
    padding: `${utils.remConverter(24)} ${utils.remConverter(15)}`,
    width: `var(--hocWidth)`,
    background: colors.Primary_Bg_Grey,
    boxShadow: colors.Shadow_Bg_Outer_Sharp,
    borderRadius: `${utils.remConverter(20)} ${utils.remConverter(20)} 0 0`,
    overflowY: `scroll`,
    maxHeight: `100%`,
    [mqMinWidth[5]]: {
      bottom: `var(--containerHeight)`,
    },
  },
]);
