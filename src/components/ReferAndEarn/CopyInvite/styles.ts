import { css } from '@emotion/react';
import { colors, mixins, typography, utils } from '@styles/shared';

export const container = css({
  backgroundColor: colors.Primary_Bg_Grey,
  boxShadow: colors.Shadow_Info_Inner_Smooth,
  borderRadius: 10,
  padding: `${utils.remConverter(14)} ${utils.remConverter(16)}`,
  marginBottom: utils.remConverter(12),
  width: `100%`,
});

export const text = css({
  ...typography.T_12_Light,
  color: colors.Secondary_Black_Text,
});
