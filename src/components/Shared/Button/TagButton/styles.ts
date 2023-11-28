import { css } from '@emotion/react';
import { colors, typography, utils } from '@styles/shared';

export const container = css({
  background: colors.Secondary_White,
  padding: `${utils.remConverter(8)} ${utils.remConverter(10)}`,
  border: `1.5px solid ${colors.Primary_Blue}`,
  boxShadow: colors.Shadow_Card_Outer_Smooth,
  borderRadius: 4,
  textAlign: `center`,
  cursor: `pointer`,
  flex: 1,
});

export const text = css({
  ...typography.T_14_Regular,
  color: colors.Secondary_Black_Text,
});

export const activeTab = css({
  background: colors.Primary_Blue,
});

export const activeText = css({
  ...typography.T_14_Semibold,
  color: colors.Secondary_White,
});
