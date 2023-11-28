import { css } from '@emotion/react';
import { colors, utils } from '@styles/shared';
import Typography from '@styles/shared/typography';

export const container = css({
  borderRadius: 4,
  overflow: `hidden`,
  boxShadow: colors.Shadow_Card_Outer_Sharp,
  background: colors.Secondary_White,
  cursor: `pointer`,
});

export const colorBox = css({
  height: utils.remConverter(48),
});

export const detailsBox = css({
  padding: `${utils.remConverter(16)}  ${utils.remConverter(12)}`,
  display: `flex`,
  flexDirection: `column`,
  gap: utils.remConverter(4),
});

export const title = css({
  ...Typography.T_20_Bold,
});

export const subTitle = css({
  ...Typography.T_14_Regular,
});
