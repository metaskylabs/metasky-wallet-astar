import { css } from '@emotion/react';
import { colors, utils } from '@styles/shared';
import Typography from '@styles/shared/typography';

export const container = css({
  ...Typography.T_14_Semibold,
  backgroundColor: colors.Primary_Blue,
  boxShadow: colors.Shadow_Card_Outer_Sharp,
  color: colors.Secondary_White,
  padding: `${utils.remConverter(8)} ${utils.remConverter(10)}`,
  cursor: `pointer`,
  borderRadius: utils.remConverter(4),
});

export const icon = css({
  marginRight: utils.remConverter(10),
  width: utils.remConverter(20),
  height: utils.remConverter(20),
});
