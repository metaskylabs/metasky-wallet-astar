import { colors, typography, utils } from '@styles/shared';
import { css } from '@emotion/react';

export const button = css({
  border: 0,
  background: `none`,
  color: colors.Secondary_White,
  textDecoration: `underline`,
  padding: `0 ${utils.remConverter(5)}`,
});
