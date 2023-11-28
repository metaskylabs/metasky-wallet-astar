import { css } from '@emotion/react';
import { colors, typography, utils } from '@styles/shared';

export const name = css({
  ...typography.T_14_Regular,
  marginRight: utils.remConverter(40),
  color: colors.Secondary_Black_Text,
});

export const value = css({
  maxWidth: utils.remConverter(120),
  textAlign: `right`,
  textOverflow: `ellipsis`,
  whiteSpace: `nowrap`,
  overflow: `hidden`,
});

export const regular = css({
  ...typography.T_14_Regular,
  color: colors.Secondary_Black_Text,
});

export const bold = css({
  ...typography.T_14_Bold,
  color: colors.Secondary_Black_Text,
});
