import { css } from '@emotion/react';
import { colors, typography, utils } from '@styles/shared';

export const container = css({
  boxShadow: colors.Shadow_Card_Outer_Smooth,
  borderRadius: 4,
});

export const imgContainer = css({
  width: `100%`,
  overflow: `hidden`,
  borderRadius: `${utils.remConverter(4)} ${utils.remConverter(4)} 0 0`,
});

export const img = css({
  width: `100%`,
  aspectRatio: `1/1`,
  objectFit: `cover`,
});

export const name = css({
  ...typography.T_16_Semibold,
  textAlign: `center`,
  padding: `${utils.remConverter(16)} 0 ${utils.remConverter(12)}`,
});
