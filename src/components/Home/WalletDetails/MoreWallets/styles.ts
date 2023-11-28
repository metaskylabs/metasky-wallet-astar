import { css } from '@emotion/react';
import { colors, mixins, utils } from '@styles/shared';

export const container = css({
  background: colors.Primary_Bg_Grey,
  boxShadow: colors.Shadow_Card_Outer_Smooth,
  borderRadius: 4,
  padding: utils.remConverter(16),
  display: `flex`,
  flexDirection: `column`,
  cursor: `pointer`,
});

export const header = css({
  display: `flex`,
  justifyContent: `space-between`,
  marginBottom: utils.remConverter(8),
});

export const buttonWhiteBg = css([
  {
    borderRadius: `100%`,
    height: utils.remConverter(27),
    width: utils.remConverter(27),
    background: colors.BACK_BUTTON_BORDER,
  },
  mixins.flexAlignJustifiedCenter,
]);
export const buttonYellowBg = css(
  [
    {
      borderRadius: `100%`,
      height: utils.remConverter(24),
      width: utils.remConverter(24),
      background: colors.Primary_Yellow,
      boxShadow: colors.Shadow_Btn_S_Outer_Smooth,
      padding: utils.remConverter(5.3),
    },
  ],
  mixins.flexAlignJustifiedCenter,
);
