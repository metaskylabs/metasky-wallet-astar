import { css } from '@emotion/react';
import { colors, utils } from '@styles/shared';

export const tableContainer = css({
  background: colors.Secondary_White,
  borderRadius: `${utils.remConverter(0)} ${utils.remConverter(
    0,
  )} ${utils.remConverter(4)} ${utils.remConverter(4)}`,
  overflow: `hidden`,
});

export const divider = css({
  margin: `${utils.remConverter(0)} ${utils.remConverter(16)}`,
});
