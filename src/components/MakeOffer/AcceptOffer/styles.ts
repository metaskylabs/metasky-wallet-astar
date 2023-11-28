import { css } from '@emotion/react';
import { colors, mixins, typography, utils } from '@styles/shared';

export const nftCardDetailsContainer = css({
  boxShadow: colors.Shadow_Card_Outer_Smooth,
  borderRadius: 4,
});

export const gasFee = css({
  background: colors.Secondary_White,
  padding: `${utils.remConverter(12)} ${utils.remConverter(18)}`,
});

export const gasRequired = css({
  borderRadius: `100%`,
  background: colors.Tertiary_Blue,
  width: `${utils.remConverter(9)}`,
  height: `${utils.remConverter(9)}`,
});

export const checkbox = css({
  margin: 0,
});

export const notifyInfo = css({
  background: colors.Secondary_White,
  padding: utils.remConverter(12),
});

export const viewDetails = css({
  ...typography.T_12_Semibold,
  color: colors.Primary_Blue,
  cursor: `pointer`,
});

export const contentWrapper = css({
  padding: `0 ${utils.remConverter(16)}`,
});
