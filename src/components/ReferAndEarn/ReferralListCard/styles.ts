import { css } from '@emotion/react';
import { colors, typography, utils } from '@styles/shared';

export const container = css({
  background: colors.Secondary_White,
  border: `1px solid ${colors.Grey_Border}`,
  padding: utils.remConverter(16),
  borderRadius: 4,
});

export const date = css({
  ...typography.T_12_Regular,
  color: colors.Secondary_Black_Text,
  marginBottom: utils.remConverter(12),
});

export const contact = css({
  ...typography.T_16_Semibold,
  color: colors.Secondary_Black_Text,
});

export const message = css({
  ...typography.T_14_Regular,
  color: colors.Secondary_Black_Text,
});

export const amount = css({
  ...typography.T_14_Semibold,
  color: colors.Tertiary_Toast_Green,
});

export const amountPending = css({
  ...typography.T_14_Semibold,
  color: colors.Tertiary_Darker_Yellow,
});

export const divider = css({
  margin: `${utils.remConverter(20)} 0`,
});

export const icon = css({
  width: utils.remConverter(14),
  height: utils.remConverter(14),
});
