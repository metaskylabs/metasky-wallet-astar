import { css } from '@emotion/react';
import { colors, typography, utils } from '@styles/shared';

export const purchaseRankingChip = css({
  display: `flex`,
  padding: `0 ${utils.remConverter(8)}`,
  borderRadius: 25,
});

export const purchaseRankingText = css({
  ...typography.T_12_Semibold,
  color: colors.Secondary_White,
});
