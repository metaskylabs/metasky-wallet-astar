import { css } from '@emotion/react';
import { colors, utils } from '@styles/shared';

export const transactionDetailsContainer = css({
  boxShadow: colors.Shadow_Card_Outer_Smooth,
  margin: `0 ${utils.remConverter(16)} ${utils.remConverter(20)} `,
  display: `flex`,
  borderRadius: 4,
});
