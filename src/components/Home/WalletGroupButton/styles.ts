import { colors, typography, utils } from '@styles/shared';
import { css } from '@emotion/react';

export const buttonGroup = css({
  ...typography.T_12_Semibold,
  background: colors.Shadow_Card_Outer_Sharp_OLD,
  backgroundBlendMode: `soft-light, normal`,
  boxShadow: colors.Shadow_Info_Inner_Smooth,
  borderRadius: 50,
  color: colors.Primary_Blue,
  position: `relative`,
  flexWrap: `wrap`,
});

export const buttonTransitionWallet = css({
  flex: `auto`,
  cursor: `pointer`,
  width: `${utils.remConverter(70)}`,
  padding: `${utils.remConverter(16)} 0`,
});
export const middleButton = css({
  position: `relative`,
  width: `${utils.remConverter(110)}`,
  cursor: `pointer`,
  //  Add media query for small devides
});
export const specialButtonCon = css({
  background: colors.Gradient_Yellow,
  position: `absolute`,
  left: 0,
  right: 0,
  top: -30,
  botton: -30,
  padding: 20,
  borderRadius: 50,
  color: colors.Secondary_Black_Text,
  display: `flex`,
  boxShadow: colors.Shadow_Card_Outer_Sharp2,
  minWidth: 110,
  justifyContent: `center`,
});
export const specialButtonImage = css({
  width: 20,
  marginRight: 5,
});
