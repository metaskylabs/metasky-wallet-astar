import { css } from '@emotion/react';
import { colors, utils } from '@styles/shared';

export const container = css({
  background: colors.Primary_Blue,
  padding: `${utils.remConverter(8)} ${utils.remConverter(12)}`,
  boxShadow: colors.Shadow_Card_Outer_Sharp3,
  borderRadius: 4,
  margin: `${utils.remConverter(20)} ${utils.remConverter(16)}`,
  cursor: `pointer`,
});
