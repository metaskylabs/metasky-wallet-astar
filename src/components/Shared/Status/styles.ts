import { css } from '@emotion/react';
import { colors, utils } from '@styles/shared';

export const container = css({
  backgroundColor: colors.Tertiary_Toast_Green,
  borderRadius: 4,
  padding: `${utils.remConverter(2)} ${utils.remConverter(8)}`,
  color: colors.Secondary_White,
  textAlign: `center`,
  width: utils.remConverter(68),
});
