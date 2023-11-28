import { css } from '@emotion/react';
import { colors, mixins, typography, utils } from '@styles/shared';

export const container = css({
  background: colors.Primary_Bg_Grey,
  boxShadow: colors.Shadow_Card_Outer_Smooth,
  borderRadius: 4,
  padding: utils.remConverter(12),
  width: `100%`,
});

export const count = css({
  ...typography.T_24_Bold,
  color: colors.Primary_Blue,
});

export const mesage = css({
  ...typography.T_12_Semibold,
  color: colors.Secondary_Black_Text,
});

export const iconContainer = css([
  {
    background: colors.Secondary_White,
    boxShadow: colors.Shadow_Input_Inner_Smooth,
    padding: `${utils.remConverter(6)} ${utils.remConverter(10)}`,
    borderRadius: 35,
    width: utils.remConverter(34),
    height: utils.remConverter(34),
    marginBottom: utils.remConverter(6),
  },
  mixins.flexAlignJustifiedCenter,
]);
