import { css } from '@emotion/react';
import { colors, typography, utils } from '@styles/shared';

export const container = css({
  padding: `${utils.remConverter(20)} ${utils.remConverter(16)}`,
  background: colors.Ribbon_Blue,
  borderBottomLeftRadius: 12,
  borderBottomRightRadius: 12,
  boxShadow: colors.Shadow_Card_Outer_Sharp,
  position: `relative`,
  overflow: `hidden`,
});

export const bgImage = css({
  width: utils.remConverter(50),
  height: `auto`,
  position: `absolute`,
  right: 16,
  bottom: 0,
  opacity: 0.8,
});
export const greeting = css({
  display: `flex`,
  justifyContent: `space-between`,
  marginBottom: utils.remConverter(30),
});
export const hamburger = css({
  width: utils.remConverter(24),
  height: `auto`,
});
export const greetInfo = css({
  ...typography.T_20_Bold,
  color: colors.White,
});
export const walletCta = css({
  ...typography.T_12_Regular,
  color: colors.Primary_Yellow,
  cursor: `pointer`,
});
export const profileCtaContainer = css({
  cursor: `pointer`,
});
export const worthWrapper = css({
  display: `flex`,
  flexWrap: `wrap`,
});
export const card = css({
  borderRadius: 5,
  // FIXME : set in style guide
  background: colors.Primary_Blue,
  minWidth: utils.remConverter(142),
  padding: `${utils.remConverter(12)} ${utils.remConverter(16)}`,
  position: `relative`,
  marginRight: utils.remConverter(8),
});
export const cardHeading = css({
  ...typography.T_14_Regular,
  color: colors.White,
  position: `relative`,
});
export const count = css({
  ...typography.T_20_Bold,
  color: colors.White,
  position: `relative`,
});
export const cardImage = css({
  height: utils.remConverter(50),
  width: `auto`,
  position: `absolute`,
  right: 0,
  bottom: 0,
});
export const placeHolder = css({
  width: utils.remConverter(78),
  height: utils.remConverter(30),
});
