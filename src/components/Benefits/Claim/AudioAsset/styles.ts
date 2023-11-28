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
});

export const audioPlayerContainer = css({});

export const name = css({
  ...typography.T_20_Bold,
  textAlign: `center`,
  padding: `${utils.remConverter(16)} 0`,
});

export const playButton = css({
  background: colors.Primary_Blue,
  boxShadow: colors.Shadow_Circle_Sharp,
  borderRadius: `100%`,
  padding: utils.remConverter(6.67),
  width: utils.remConverter(40),
  height: utils.remConverter(40),
  cursor: `pointer`,
});

export const controls = css({
  padding: `${utils.remConverter(16)} ${utils.remConverter(95)}`,
  display: `flex`,
  justifyContent: `space-between`,
});

export const prev = css({
  boxShadow: colors.Shadow_Circle_Sharp,
  borderRadius: `100%`,
  padding: utils.remConverter(12),
  width: utils.remConverter(40),
  height: utils.remConverter(40),
  cursor: `pointer`,
  background: colors.Secondary_White,
  display: `flex`,
});

export const seek = css({
  width: `100%`,
});

export const seekContainer = css({
  padding: `${utils.remConverter(26)} ${utils.remConverter(4)} 0`,
});

export const seekData = css({
  ...typography.T_12_Regular,
  display: `flex`,
  justifyContent: `space-between`,
  alignItems: `center`,
});
