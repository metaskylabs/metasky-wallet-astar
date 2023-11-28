import { css } from '@emotion/react';
import { colors, typography, utils } from '@styles/shared';

export const title = css({
  ...typography.T_16_Bold,
  color: colors.Secondary_Black_Text,
  margin: `${utils.remConverter(40)} ${utils.remConverter(
    16,
  )} ${utils.remConverter(16)} ${utils.remConverter(16)}`,
});

export const forgetPinContainer = css({
  display: `flex`,
  justifyContent: `flex-end`,
  margin: `0 ${utils.remConverter(16)}`,
});

export const forgetPinText = css({
  ...typography.T_14_Regular,
  color: colors.Primary_Blue,
  cursor: `pointer`,
});
export const mainContainer = css({
  display: `flex`,
  height: `100%`,
  flexDirection: `column`,
  justifyContent: `space-between`,
});
export const btnContainer = css({
  width: `100%`,
  padding: utils.remConverter(16),
});

export const btn = css({
  width: `100%`,
  color: colors.Secondary_Black_Text,
  height: `54px`,
});

export const loader = css({
  width: utils.remConverter(25),
  marginLeft: utils.remConverter(10),
});

export const inputContainer = css({
  padding: utils.remConverter(16),
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

export const pinsContainer = {
  width: `100%`,
  display: `flex !important`,
  justifyContent: `space-between !important`,
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

export const button = css({
  background: colors.Primary_Yellow,
  boxShadow: colors.Shadow_Btn_P_Outer_Sharp,
  borderRadius: `50px`,
  padding: `12px`,
  width: `100%`,
  border: `0`,
  ...typography.T_20_Bold,
  height: `54px`,
  color: colors.Secondary_Black_Text,
});

export const link = css({
  color: colors.Primary_Blue,
  border: `0`,
  background: `transparent`,
  ...typography.T_16_Semibold,
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

export const labelValue = css({
  color: colors.Secondary_Black_Text,
});

export const text = css({
  margin: `36.5px 0 23.5px 0`,
  color: colors.Grey_Text,
  ...typography.T_14_Regular,
  padding: `0 15.5px`,
});

export const buttonContainer = css({
  width: `100%`,
  padding: utils.remConverter(16),
  position: `absolute`,
  bottom: 0,
});

export const errorEnable = css({
  ...typography.T_12_Regular,
  color: `#EE2641`,
  padding: `0 16px`,
  marginTop: `20px`,
});

export const errorDisable = css({
  ...typography.T_12_Regular,
  color: colors.Primary_Bg_Grey,
});
