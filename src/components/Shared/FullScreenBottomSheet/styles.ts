import { colors } from '@/styles/shared';
import { css } from '@emotion/react';

export const bottomSheetPopup = css({
  display: `block`,
  position: `fixed`,
  top: 0,
  zIndex: 15,
  height: `100vh`,
  width: `100vw`,
});

export const visibile = css({
  opacity: 1,
  transition: `all 300ms ease-in-out`,
});

export const notVisibile = css({
  display: `none`,
});

export const backDrop = css({
  position: `fixed`,
  top: 0,
  background: `rgba(0, 0, 0, 0.6)`,
  backdropFilter: `blur(20px)`,
});

export const closeBtn = css({
  position: `absolute`,
  top: `27px`,
  right: `16px`,
  cursor: `pointer`,
});

export const bottomSheetBody = css({
  position: `fixed`,
  top: 0,
  background: colors.Primary_Bg_Grey,
  boxShadow: colors.Shadow_Bg_Outer_Sharp,
  height: `100vh`,
});
