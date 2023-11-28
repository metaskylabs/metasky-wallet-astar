import { colors, typography, utils } from '@styles/shared';
import { css } from '@emotion/react';

export const modalPopup = css({
  position: `fixed`,
  top: `0`,
  left: `0`,
  right: `0`,
  bottom: `0`,
  height: `100%`,
  zIndex: 10,
});

export const hideModalPopup = css({
  display: `none`,
});

export const backDrop = css({
  position: `absolute`,
  top: `0`,
  left: `0`,
  right: `0`,
  bottom: `0`,
  background: `rgba(0, 0, 0, 0.6)`,
  backdropFilter: `blur(20px)`,
});

export const closeBtn = css({
  position: `absolute`,
  top: `27px`,
  right: `16px`,
});

export const modalBody = css({
  position: `absolute`,
  bottom: `0`,
  left: `0`,
  right: `0`,
  background: colors.Primary_Bg_Grey,
  boxShadow: colors.modal_Body_Boxshadow,
  // borderRadius: `20px 20px 0 0`,
  height: `100%`,
});
