import { css } from '@emotion/react';
import { colors, utils } from '@styles/shared';
import Typography from '@styles/shared/typography';

export const mainContainer = css({
  padding: `${utils.remConverter(12)} ${utils.remConverter(16)}`,
  height: `100%`,
  display: `flex`,
  flexDirection: `column`,
  justifyContent: `space-between`,
});
export const heading = css({
  marginBottom: utils.remConverter(8),
});

export const desc = css({
  ...Typography.T_14_Regular,
  color: colors.Secondary_Black_Text,
  marginBottom: utils.remConverter(28),
});

export const inputWrapper = css({
  background: colors.Tertiary_Blue,
  borderRadius: 4,
  padding: `${utils.remConverter(18)} ${utils.remConverter(12)}`,
  marginBottom: utils.remConverter(40),
  color: colors.Secondary_White,
});
export const prefix = css({
  backgroundColor: colors.Primary_Bg_Grey,
  borderRadius: 4,
  padding: `${utils.remConverter(10)} ${utils.remConverter(20)}`,
});
