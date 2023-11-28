import { colors, typography, utils } from '@/styles/shared';
import { css } from '@emotion/react';

export const card = css({
  borderRadius: utils.remConverter(4),
  overflow: `hidden`,
  boxShadow: colors.Shadow_Card_Outer_Smooth,
  display: `flex`,
});

export const imageContainer = css({
  width: utils.remConverter(103),
});

export const image = css({
  width: utils.remConverter(103),
  height: `auto`,
  objectFit: `cover`,
});

export const video = css({
  width: utils.remConverter(103),
  height: `auto`,
  borderRadius: `4px 0 0 4px`,
  objectFit: `contain`,
});

export const infoContainer = css({
  padding: `${utils.remConverter(8.5)} ${utils.remConverter(
    12,
  )} ${utils.remConverter(8.5)} ${utils.remConverter(12)}`,
  display: `flex`,
  flexDirection: `column`,
  justifyContent: `space-between`,
});
export const title = css({
  ...typography.T_16_Bold,
  lineHeight: utils.remConverter(24),
  marginBottom: utils.remConverter(8),
});

export const childContainer = css({});
