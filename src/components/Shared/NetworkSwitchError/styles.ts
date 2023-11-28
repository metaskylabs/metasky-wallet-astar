import { colors, typography, utils } from '@styles/shared';
import { css } from '@emotion/react';

export const container = css({
  padding: `0 ${utils.remConverter(16)}`,
  display: `flex`,
  flexDirection: `column`,
  gap: 24,
});

export const title = css({
  ...typography.T_20_Semibold,
  textAlign: `center`,
});

export const description = css({});

export const copy = css({
  width: 14,
  height: 14,
  cursor: `pointer`,
});

export const infoContainer = css({
  width: `100%`,
  backgroundColor: colors.Secondary_White,
  borderRadius: utils.remConverter(4),
  padding: `${utils.remConverter(20)} ${utils.remConverter(15)}`,
  display: `flex`,
  flexDirection: `column`,
  gap: utils.remConverter(16),
});

export const info = css({
  ...typography.T_14_Regular,
});
