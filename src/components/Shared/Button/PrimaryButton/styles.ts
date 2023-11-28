import { colors, typography, utils } from '@styles/shared';
import { css } from '@emotion/react';

export const primaryButton = css({
  backgroundColor: colors.Primary_Yellow,
  borderRadius: 50,
  boxShadow: colors.Shadow_Btn_P_Outer_Sharp,
  width: utils.remConverter(200),
  height: utils.remConverter(50),
  border: 0,
  textTransform: `uppercase`,
  ...typography.T_20_Bold,
  display: `flex`,
  justifyContent: `center`,
  alignItems: `center`,
  color: colors.Secondary_Black_Text,

  '&:active': {
    boxShadow: colors.Shadow_Btn_P_Inner,
    color: colors.PressedButtonBrown,
    opacity: `0.6`,
  },
});

export const flexSize = css({
  width: `100%`,
});

export const loader = css({
  fontSize: 0,
});
