import { css } from '@emotion/react';
import { colors, typography, utils } from '@styles/shared';

export const connectIcon = css({
  width: utils.remConverter(16),
  height: utils.remConverter(16),
  backgroundColor: colors.Primary_Blue,
  borderRadius: 100,
  marginRight: utils.remConverter(8),
  display: `flex`,
  alignItems: `center`,
});

export const connectText = css({
  ...typography.T_12_Semibold,
  color: colors.Primary_Blue,
});
