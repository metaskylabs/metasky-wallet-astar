import { css } from '@emotion/react';
import { colors, typography, utils } from '@styles/shared';

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

export const container = css({
  padding: utils.remConverter(16),
  backgroundColor: colors.Secondary_White,
  color: colors.Secondary_Black_Text,
});

export const description = css({
  ...typography.T_14_Regular,
  color: colors.Secondary_Black_Text,
  marginBottom: utils.remConverter(16),
});

export const title = css({
  marginBottom: utils.remConverter(4),
});
