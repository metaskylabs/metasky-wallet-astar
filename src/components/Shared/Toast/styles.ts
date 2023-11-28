import { colors, typography, utils } from '@styles/shared';
import { css } from '@emotion/react';
import { mq } from '@styles/shared/mediaQueries';

export const container = css({
  padding: utils.remConverter(12),
  display: `flex`,
  zIndex: 9,
  justifyContent: `space-between`,
  alignItems: `center`,
  gap: `10px`,
  color: colors.Secondary_White,
  borderRadius: 4,
  width: `100%`,
  [mq[5]]: {
    top: 0,
    position: `relative`,
    zIndex: 25,
  },
});
export const info = css({
  background: colors.Tertiary_Blue,
  boxShadow: colors.Shadow_Outer_Dropdown,
});
export const success = css({
  background: colors.Tertiary_Toast_Green,
  boxShadow: colors.Shadow_Outer_Dropdown,
});
export const danger = css({
  background: colors.Tertiary_Red,
  boxShadow: colors.Shadow_Outer_Dropdown,
});
export const text = css({
  flex: `1`,
  ...typography.T_16_Regular,
  color: colors.Secondary_White,
  a: {
    color: colors.Secondary_White,
    lineHeight: 1,
    display: `inline-block`,
    marginBottom: `7px`,
  },
});
export const toastIcon = css({
  height: utils.remConverter(20),
  width: utils.remConverter(20),
});
export const link = css({
  ...typography.T_16_Regular,
  color: colors.Secondary_White,
  textDecoration: `underline`,
});
