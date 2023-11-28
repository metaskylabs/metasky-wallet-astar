import { css } from '@emotion/react';
import { colors, utils } from '@styles/shared';

export const imgContainer = css({
  height: utils.remConverter(64),
  width: utils.remConverter(64),
  borderRadius: `100%`,
  border: `2px solid ${colors.Secondary_White}`,
  marginLeft: utils.remConverter(16),
  marginTop: `-${utils.remConverter(32)}`,
  overflow: `hidden`,
  background: colors.Secondary_White,
});
export const logo = css({
  width: `100%`,
  height: `100%`,
  objectFit: `contain`,
  background: colors.Secondary_White,
});
