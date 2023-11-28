import { css } from '@emotion/react';
import { colors, typography, utils } from '@styles/shared';

export const detailsContainer = css({
  boxShadow: colors.Shadow_Card_Outer_Smooth,
  padding: utils.remConverter(16),
  display: `flex`,
  flexDirection: `column`,
  borderRadius: 4,
  background: colors.Primary_Bg_Grey,
  gap: utils.remConverter(20),
  margin: `${utils.remConverter(16)} ${utils.remConverter(16)}`,
});

export const walletTitle = css({
  ...typography.T_16_Semibold,
  display: `flex`,
  justifyContent: `space-between`,
});

export const credentials = css({
  display: `flex`,
  gap: utils.remConverter(5),
});

export const imgContainer = css({
  height: utils.remConverter(20),
  width: utils.remConverter(20),
});

export const chainContainer = css({
  background: colors.Secondary_White,
  padding: `${utils.remConverter(12)} ${utils.remConverter(16)}`,
  borderRadius: 4,
  display: `flex`,
  flexDirection: `column`,
  gap: utils.remConverter(16),
});

export const chainTitle = css({
  ...typography.T_14_Bold,
  display: `flex`,
  gap: utils.remConverter(6),
  alignItems: `center`,
});

export const viewQr = css({
  ...typography.T_14_Bold,
  color: colors.Primary_Blue,
  cursor: `pointer`,
});

export const addressLogo = css({
  width: utils.remConverter(20),
  height: utils.remConverter(20),
  marginLeft: utils.remConverter(10),
  cursor: `pointer`,
});

export const image = css({
  maxHeight: `100%`,
  maxWidth: `100%`,
});

export const ctaContainer = css({
  padding: `0 ${utils.remConverter(16)} ${utils.remConverter(32)}`,
});

export const connectedSites = css({
  padding: 0,
  margin: 0,
});
