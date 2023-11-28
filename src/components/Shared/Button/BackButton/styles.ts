import { colors, utils } from '@styles/shared';
import { css } from '@emotion/react';

export const backButtonContainer = css({
  height: utils.remConverter(44),
  width: utils.remConverter(44),
  padding: utils.remConverter(2),
  borderRadius: `100%`,
  background: colors.BACK_BUTTON_BORDER,
  '&:active': {
    background: `none`,
  },
});

export const backButton = css({
  backgroundColor: colors.Secondary_White,
  boxShadow: colors.Shadow_Btn_P_Outer_Smooth,
  borderRadius: `100%`,
  height: utils.remConverter(40),
  width: utils.remConverter(40),
  minWidth: utils.remConverter(40),
  border: 0,
  padding: `${utils.remConverter(7)} ${utils.remConverter(
    10,
  )} ${utils.remConverter(9)} ${utils.remConverter(6)}`,
  '&:active': {
    boxShadow: colors.Shadow_Info_Inner_Sharp,
    background: colors.Primary_Bg_Grey,
  },
});
