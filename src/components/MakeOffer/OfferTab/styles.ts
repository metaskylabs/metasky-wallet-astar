import { colors, typography, utils } from '@styles/shared';
import { css } from '@emotion/react';

export const transferTitle = css({
  ...typography.T_20_Bold,
  marginLeft: utils.remConverter(12),
});

export const tabContainer = css({
  width: `50%`,
  textAlign: `center`,
  borderBottom: `2px solid ${colors.Grey_Border}`,
  padding: utils.remConverter(8),
  cursor: `pointer`,
});

export const tabContent = css({
  ...typography.T_16_Semibold,
  color: colors.Secondary_Black_Text,
});

export const tabActiveContainer = css({
  borderBottom: `2px solid ${colors.Primary_Blue}`,
});

export const tabActiveContent = css({
  ...typography.T_16_Bold,
  color: colors.Primary_Blue,
});
