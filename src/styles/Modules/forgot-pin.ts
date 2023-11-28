import { css } from '@emotion/react';
import { prepareDataForValidation } from 'formik';
import { colors, typography, utils } from '../shared';

export const title = css({
  ...typography.T_16_Bold,
  color: colors.Secondary_Black_Text,
  margin: `${utils.remConverter(40)} ${utils.remConverter(
    16,
  )} 0 ${utils.remConverter(16)}`,
});

export const forgetPinContainer = css({
  display: `flex`,
  justifyContent: `space-between`,
  alignItems: `center`,
  margin: `0 ${utils.remConverter(16)}`,
});

export const resendOtpText = css({
  ...typography.T_14_Regular,
  color: colors.Primary_Blue,
});

export const resendOtpTextDisabled = css({
  ...typography.T_14_Regular,
  color: `#97A9F6`,
});

export const btnContainer = css({
  position: `fixed`,
  bottom: utils.remConverter(20),
  width: `100%`,
  padding: utils.remConverter(16),
});

export const btn = css({
  width: `100%`,
  color: colors.Secondary_Black_Text,
});

export const brandIcon = css({
  textAlign: `center`,
  marginTop: utils.remConverter(108),
});
export const verificationMessage = css({
  ...typography.T_14_Regular,
  color: colors.Secondary_Black_Text,
  textAlign: `center`,
  marginTop: utils.remConverter(20),
  padding: `0 ${utils.remConverter(16)}`,
});

// bottom sheet styles

export const bottomSheetContainer = css({
  display: `flex`,
  flexDirection: `column`,
  justifyContent: `center`,
  alignItems: `center`,
  marginTop: utils.remConverter(84),
});

export const imgContainer = css({
  height: utils.remConverter(142),
  width: utils.remConverter(142),
  borderRadius: `50%`,
  backgroundColor: colors.Grey_Border,
  padding: utils.remConverter(31.5),
});

export const textContainer = css({
  textAlign: `center`,
  marginTop: utils.remConverter(48),
});

export const pinUpdatedTitle = css({
  ...typography.T_20_Bold,
  color: colors.Secondary_Black_Text,
});

export const subtitle = () =>
  css({
    ...typography.T_16_Regular,
    color: colors.Grey_Text,
    marginBottom: utils.remConverter(112),
  });

export const form = css({
  margin: `35px 0 90px`,
});

export const formLabel = css({
  color: colors.Secondary_Black_Text,
  ...typography.T_16_Semibold,
  padding: `0 ${utils.remConverter(16)}`,
});

export const formGroup = css({
  marginTop: `20px`,
  display: `flex`,
  padding: `0 ${utils.remConverter(16)}`,
});

export const mobile = css({
  width: `100%`,
});

export const button = css({
  background: colors.Primary_Yellow,
  boxShadow: colors.Shadow_Btn_P_Outer_Sharp,
  borderRadius: `50px`,
  padding: `12px`,
  width: `100%`,
  border: `0`,
  ...typography.T_20_Bold,
});

export const link = css({
  color: colors.Primary_Blue,
  border: `0`,
  background: `transparent`,
  ...typography.T_16_Semibold,
});

export const resendOtpDisable = css({
  opacity: 0.5,
});

export const resendOtpEnabled = css({
  opacity: 1,
});

export const timerContainer = css({
  ...typography.T_16_Regular,
  color: colors.Secondary_Black_Text,
});

export const textCenter = css({
  textAlign: `center`,
});

export const changelink = css({
  display: `flex`,
  alignItems: `center`,
  marginTop: `20px`,
  color: colors.Primary_Blue,
  border: `0`,
  background: `transparent`,
  ...typography.T_14_Semibold,
});

export const changelinkIcon = css({
  marginRight: `5px`,
  lineHeight: `0`,
});

export const metaskyLogo = css({
  margin: `${utils.remConverter(23)} 0`,
  height: utils.remConverter(40),
});

export const otpDescription = css({
  margin: `0 ${utils.remConverter(16)} ${utils.remConverter(
    40,
  )} ${utils.remConverter(16)}`,
  ...typography.T_14_Regular,
  color: colors.Secondary_Black_Text,
});

export const labelValue = css({
  ...typography.T_14_Semibold,
  color: colors.Secondary_Black_Text,
});

export const remaining = css({
  display: `flex`,
  justifyContent: `space-between`,
  marginTop: `20px`,
  padding: `0 ${utils.remConverter(16)}`,
});

export const time = css({
  display: `flex`,
  alignItems: `center`,
  color: colors.Secondary_Black_Text,
  ...typography.T_16_Regular,
});

export const timeIcon = css({
  marginRight: `5px`,
  lineHeight: `0`,
});

export const buttonContainer = css({
  position: `absolute`,
  display: `flex`,
  bottom: 0,
  width: `100%`,
  padding: `0 ${utils.remConverter(16)} ${utils.remConverter(32)}`,
});

export const errorEnable = css({
  ...typography.T_14_Semibold,
  color: `#EE2641`,
  padding: `0 16px`,
  marginTop: `20px`,
});

export const errorDisable = css({
  ...typography.T_12_Regular,
  color: colors.Primary_Bg_Grey,
});

export const inputContainer = css({
  marginTop: `20px`,
  display: `flex`,
  padding: `0 ${utils.remConverter(16)}`,
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

export const loader = css({
  width: utils.remConverter(25),
  marginLeft: utils.remConverter(10),
});

export const pinsContainer = {
  width: `100%`,
  display: `flex !important`,
  justifyContent: `space-between !important`,
};

export const pinOtpStyle = {
  height: utils.remConverter(52),
  padding: utils.remConverter(12),
  color: colors.Primary_Blue,
  backgroundColor: colors.Primary_Bg_Grey,
  boxShadow: `inset -2px -2px 10px #FAFBFF, inset 2px 2px 10px #C6C9D3`,
  WebkitAppearance: `none`,
  borderRadius: `10px`,
  border: `0`,
  ...typography.T_20_Regular,
  textAlign: `center`,
  aspectRatio: `1/1`,
};

export const InvalidPinOtpStyle = {
  height: utils.remConverter(52),
  padding: utils.remConverter(12),
  color: colors.Tertiary_Red,
  backgroundColor: colors.Primary_Bg_Grey,
  boxShadow: `inset 2px 2px 10px #C6C9D3`,
  border: `3px solid ${colors.Tertiary_Red}`,
  borderRadius: utils.remConverter(10),
  ...typography.T_20_Regular,
  textAlign: `center`,
  aspectRatio: `1/1`,
};

export const successPinOtpStyle = {
  width: `100%`,
  height: `52px`,
  padding: `12px`,
  color: colors.Primary_Blue,
  backgroundColor: colors.Primary_Bg_Grey,
  boxShadow: `inset 2px 2px 10px #C6C9D3`,
  border: `3px solid ${colors.Tertiary_Green}`,
  borderRadius: utils.remConverter(10),
  ...typography.T_20_Regular,
  textAlign: `center`,
};

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
  boxShadow: `inset 2px 2px 10px #C6C9D3`,
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
  boxShadow: `inset 2px 2px 10px #C6C9D3`,
  border: `3px solid ${colors.Tertiary_Green}`,
  borderRadius: utils.remConverter(10),
  ...typography.T_20_Regular,
  textAlign: `center`,
};
