import { css } from '@emotion/react';
import { colors, typography, utils } from '@styles/shared';

export const container = css({
  background: colors.Secondary_White,
  padding: `${utils.remConverter(12)} ${utils.remConverter(16)}`,
  width: `100%`,
  display: `flex`,
  alignItems: `center`,
});

export const image = css({
  width: utils.remConverter(55),
  height: utils.remConverter(55),
  objectFit: `contain`,
  borderRadius: `100%`,
  marginRight: utils.remConverter(25),
});
export const details = css({
  flexGrow: `1`,

  overflow: `hidden`,
});
export const title = css({
  ...typography.T_20_Bold,
  margin: 0,
  marginBottom: utils.remConverter(4),
  color: colors.Secondary_Black_Text,
});
export const ctaText = css({
  ...typography.T_12_Semibold,
  color: colors.Primary_Blue,
  cursor: `pointer`,
});
