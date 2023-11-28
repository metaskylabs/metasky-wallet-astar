import { colors, typography, utils } from '@styles/shared';
import { css } from '@emotion/react';

export const buttonTransfer = css({
  borderRadius: 50,
  background: colors.Gradient_Yellow,
  backgroundBlendMode: `soft-light, normal`,
  boxShadow: colors.Shadow_Card_Outer_Sharp2,
  height: utils.remConverter(50),
  width: utils.remConverter(100),
  color: colors.Secondary_Black_Text,
  cursor: `pointer`,
  '&:active': {
    boxShadow: colors.Shadow_Btn_P_Inner,
    color: colors.Tertiary_Grey,
  },
});

export const buttonText = css({
  ...typography.T_12_Semibold,
  marginLeft: utils.remConverter(5),
});
