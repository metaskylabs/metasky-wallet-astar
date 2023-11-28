import { css } from '@emotion/react';
import { colors, typography } from '@styles/shared';
import utils from '@styles/shared/utils';

export const emptyCollectionHeader = css({
  ...typography.T_28_Regular,
  color: colors.Secondary_Black_Text,
  marginBottom: utils.remConverter(12),
});

export const emptyCollectionDescription = css({
  ...typography.T_16_Regular,
  marginBottom: utils.remConverter(12),
  color: colors.Secondary_Black_Text,
  textAlign: `center`,
  padding: `0 ${utils.remConverter(16)}`,
});
