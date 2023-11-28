import { css } from '@emotion/react';
import { colors, typography } from '@styles/shared';
import utils from '@styles/shared/utils';

export const emptyTransactionHeader = css({
  ...typography.T_28_Regular,
  color: colors.Secondary_Black_Text,
  marginBottom: utils.remConverter(16),
});

export const emptyTransactionDescription = css({
  ...typography.T_16_Regular,
  marginBottom: utils.remConverter(12),
  color: colors.Secondary_Black_Text,
  width: utils.remConverter(224),
  textAlign: `center`,
});

export const emptyTransactionLink = css({
  ...typography.T_16_Semibold,
  color: colors.Primary_Blue,
  cursor: `pointer`,
});
