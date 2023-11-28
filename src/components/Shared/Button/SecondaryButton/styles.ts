import { colors, typography, utils } from '@styles/shared';
import { css } from '@emotion/react';

export const secondaryButton = css({
  backgroundColor: colors.Primary_Bg_Grey,
  borderRadius: 50,
  boxShadow: colors.Shadow_Btn_P_Outer_Sharp,
  width: `100%`,
  height: utils.remConverter(54),
  border: `${utils.remConverter(2)} solid`,
  color: colors.Primary_Blue,
  ...typography.T_20_Bold,
  '&:active': {
    boxShadow: colors.Shadow_Info_Inner_Sharp,
    color: colors.Primary_Blue,
    opacity: `0.7`,
  },
  textTransform: `uppercase`,
});
