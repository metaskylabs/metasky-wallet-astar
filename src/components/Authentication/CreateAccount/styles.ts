import { colors, mixins, typography, utils } from '@styles/shared';
import { css } from '@emotion/react';

export const title = css({
  textAlign: `center`,
  color: colors.Secondary_Black_Text,
  ...typography.T_20_Bold,
  marginTop: utils.remConverter(25),
  marginBottom: utils.remConverter(20),
});

export const accountContainer = css([]);

export const formLabel = css({
  color: colors.Secondary_Black_Text,
  ...typography.T_16_Semibold,
  padding: `0 ${utils.remConverter(16)}`,
  marginBottom: utils.remConverter(20),
});

export const formGroup = css({
  marginBottom: `10px`,
  display: `flex`,
  padding: `0 ${utils.remConverter(16)}`,
});

export const mobile = css({
  display: `flex`,
  gap: `34px`,
  width: `100%`,
});

export const input = css({
  width: `64px`,
  height: `64px`,
  padding: `12px`,
  color: colors.Secondary_Black_Text,
  backgroundColor: colors.Primary_Bg_Grey,
  boxShadow: `inset -2px -2px 10px #FAFBFF, inset 2px 2px 10px #C6C9D3`,
  borderRadius: `10px`,
  border: `0`,
  fontSize: `24px`,
  textAlign: `center`,
  '&: focus': {
    outline: `none`,
  },
});

export const button = css({
  background: colors.Primary_Yellow,
  boxShadow: colors.Shadow_Btn_P_Outer_Sharp,
  borderRadius: `50px`,
  padding: `12px`,
  width: `100%`,
  border: `0`,
  color: colors.Secondary_Black_Text,
  ...typography.T_20_Bold,
});

export const link = css({
  color: colors.Primary_Blue,
  border: `0`,
  background: `transparent`,
  ...typography.T_16_Semibold,
});

export const textCenter = css({
  textAlign: `center`,
  padding: `0 ${utils.remConverter(16)}`,
});

export const buttonContainer = css([
  {
    padding: utils.remConverter(16),
    background: `#F0F0F3`,
    borderTop: `1px solid ${colors.Grey_Border}`,
    width: `var(--hocWidth)`,
    position: `absolute`,
    bottom: `0`,
  },
]);

export const pinValidationFooter = css({
  width: `100%`,
  position: `fixed`,
  bottom: 0,
  marginBottom: utils.remConverter(24),
  textAlign: `center`,
});

export const textRight = css({
  textAlign: `right`,
  padding: `0 ${utils.remConverter(16)}`,
});

export const errorEnable = css({
  ...typography.T_12_Regular,
  color: `#EE2641`,
  marginTop: `20px`,
});

export const forgotLink = css({
  color: colors.Primary_Blue,
  border: `0`,
  background: `transparent`,
  ...typography.T_14_Semibold,
});

export const ctaContainer = css({
  padding: `0 ${utils.remConverter(16)} ${utils.remConverter(32)}`,
});

export const accountTitle = css({
  margin: `30px 0 0`,
  textAlign: `center`,
  color: colors.Grey_Text,
  ...typography.T_14_Semibold,
});

export const createText = css({
  color: colors.Grey_Text,
});

export const labelValue = css({
  color: colors.Secondary_Black_Text,
});

export const text = css({
  color: colors.Secondary_Black_Text,
  ...typography.T_14_Regular,
  padding: `0 ${utils.remConverter(16)}`,
  marginBottom: utils.remConverter(20),
});

export const footer = css({
  display: `flex`,
  width: `100%`,
  flexDirection: `column`,
  textAlign: `center`,
  padding: `0 ${utils.remConverter(16)}`,
  position: `absolute`,
  bottom: utils.remConverter(25),
});

export const bottomSheetHeight = css({
  height: `100%`,
  display: `flex`,
  alignItems: `center`,
  justifyContent: `center`,
  borderRadius: 0,
  padding: `0px`,
});

export const pinStyle = {
  width: `64px`,
  height: `64px`,
  padding: `12px`,
  color: colors.Secondary_Black_Text,
  backgroundColor: colors.Primary_Bg_Grey,
  boxShadow: `inset -2px -2px 10px #FAFBFF, inset 2px 2px 10px #C6C9D3`,
  WebkitAppearance: `none`,
  borderRadius: `10px`,
  border: `0`,
  ...typography.T_20_Regular,
  textAlign: `center`,
};

export const InvalidPinStyle = {
  width: `64px`,
  height: `64px`,
  padding: `12px`,
  backgroundColor: colors.Primary_Bg_Grey,
  boxShadow: `inset -2px -2px 10px #FAFBFF, inset 2px 2px 10px #C6C9D3`,
  border: `3px solid ${colors.Tertiary_Red}`,
  borderRadius: utils.remConverter(10),
  ...typography.T_20_Regular,
  textAlign: `center`,
};

export const successPinStyle = {
  width: `64px`,
  height: `64px`,
  padding: `12px`,
  backgroundColor: colors.Primary_Bg_Grey,
  boxShadow: `inset -2px -2px 10px #FAFBFF, inset 2px 2px 10px #C6C9D3`,
  border: `3px solid ${colors.Tertiary_Green}`,
  borderRadius: utils.remConverter(10),
  ...typography.T_20_Regular,
  textAlign: `center`,
};

export const pinsContainer = {
  width: `100%`,
  display: `flex !important`,
  justifyContent: `space-between !important`,
};

export const pinWrapper = css({
  marginTop: utils.remConverter(31),
});

export const loader = css({
  width: utils.remConverter(25),
  marginLeft: utils.remConverter(10),
});
