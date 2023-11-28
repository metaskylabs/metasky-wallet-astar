import { colors, typography, utils } from '@styles/shared';
import { css } from '@emotion/react';

export const sendnftHeader = css({
  marginBottom: utils.remConverter(24),
});

export const sendnftImage = css({
  height: utils.remConverter(64),
  width: utils.remConverter(64),
  borderRadius: utils.remConverter(10),
  backgroundColor: colors.Grey_Border,
});

export const sendnftTitle = css({
  ...typography.T_20_Bold,
  marginLeft: utils.remConverter(12),
});

export const sendNftBtnWrapper = css({
  marginBottom: utils.remConverter(24),
});

export const sendNftBtn = css({
  width: `100%`,
});
