import { colors, utils } from '@styles/shared';
import { css } from '@emotion/react';

export const headerProfileContainer = css({
  height: utils.remConverter(50),
  width: utils.remConverter(50),
  borderRadius: 50,
  boxShadow: colors.Shadow_Circle_Sharp,
  backgroundColor: colors.Primary_Yellow,
  cursor: `pointer`,
});

export const imgSize = css({
  height: `${utils.remConverter(32)}`,
  width: `${utils.remConverter(32)}`,
});

export const unreadCountWrapper = css({
  background: colors.Tertiary_Red,
  borderRadius: `50%`,
  height: utils.remConverter(16),
  width: utils.remConverter(16),
  marginTop: utils.remConverter(-25),
  marginLeft: utils.remConverter(-25),
});

export const unreadCountMessages = css({
  fontSize: utils.remConverter(10),
  color: colors.Secondary_White,
});
