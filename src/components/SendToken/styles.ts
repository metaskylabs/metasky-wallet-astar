import { colors, typography, utils } from '@styles/shared';
import { css } from '@emotion/react';

export const sendTokenHeader = css({
  marginBottom: utils.remConverter(24),
});

export const sendTokenImage = css({
  height: utils.remConverter(64),
  width: utils.remConverter(64),
  borderRadius: utils.remConverter(10),
  backgroundColor: colors.Grey_Border,
});

export const sendTokenTitle = css({
  ...typography.T_20_Bold,
  marginLeft: utils.remConverter(12),
});

export const sendTokenBtnWrapper = css({
  marginBottom: utils.remConverter(24),
});

export const sendTokenBtn = css({
  width: `100%`,
});
