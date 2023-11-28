import { css } from '@emotion/react';
import { colors, mixins, typography, utils } from '@styles/shared';

export const successIcon = css({
  width: utils.remConverter(200),
  height: utils.remConverter(200),
  backgroundColor: colors.Grey_Border,
  borderRadius: `50%`,
  color: colors.Secondary_Black_Text,
});
export const flexColumn = css({
  flexDirection: `column`,
  textAlign: `center`,
  justifyContent: `space-around`,
});
export const paymentScreen = css({
  minHeight: `85%`,
});

export const ScanHeading = css({
  ...typography.T_14_SemiBold,
  marginTop: utils.remConverter(28),
  marginBottom: utils.remConverter(20),
  textAlign: `center`,
  width: utils.remConverter(300),
});
export const scanner = css({
  height: utils.remConverter(320),
  width: utils.remConverter(320),
  borderRadius: utils.remConverter(30),
});

export const cta = css({
  backgroundColor: colors.Primary_Yellow,
  borderRadius: 50,
  padding: `1rem`,
  boxShadow: colors.Shadow_Btn_P_Outer_Sharp,
  width: `100%`,
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
export const divider = css({
  width: `50%`,
});
export const ORDivider = css({
  marginBottom: utils.remConverter(8),
});
export const orLine = css({
  ...typography.T_16_Regular,
  color: colors.Grey_Text,
});
export const ctaContainer = css({
  padding: utils.remConverter(10),
});
export const successMobileWrapper = css({
  position: `relative`,
});
export const buttonContainer = css([
  {
    padding: utils.remConverter(16),
    background: `#F0F0F3`,
    borderTop: `1px solid ${colors.Grey_Border}`,
    position: `absolute`,
    bottom: `0`,
    width: `var(--hocWidth)`,
    zIndex: 9,
  },
]);
