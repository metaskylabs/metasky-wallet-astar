import { colors, utils } from '@styles/shared';
import { css } from '@emotion/react';

export const avatarContainer = css({
  height: utils.remConverter(48),
  width: utils.remConverter(48),
  padding: utils.remConverter(10),
  borderRadius: 50,
  boxShadow: colors.Shadow_Circle_Sharp,
  backgroundColor: colors.Secondary_White,
  display: `flex`,
  alignItems: `center`,
  justifyContent: `center`,
  cursor: `pointer`,
});

export const avatarImage = css({
  width: `100%`,
  height: `auto`,
});
