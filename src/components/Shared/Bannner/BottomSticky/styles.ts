import { css } from '@emotion/react';
import { colors, utils } from '@styles/shared';
import Typography from '@styles/shared/typography';

export const container = css({
  ...Typography.T_16_Regular,
  textAlign: `center`,
  height: utils.remConverter(86),
  width: `100%`,
  position: `sticky`,
  bottom: 0,
  backgroundColor: colors.Tertiary_Blue,
  boxShadow: colors.Shadow_Outer_Dropdown,
  color: colors.Secondary_White,
  zIndex: 4,
  padding: `${0} ${utils.remConverter(12)}`,
  cursor: `pointer`,
});
