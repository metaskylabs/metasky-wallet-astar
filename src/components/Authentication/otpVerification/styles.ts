import { colors, typography, utils, mixins } from '@styles/shared';
import { css } from '@emotion/react';

export const title = css({
  color: colors.Secondary_Black_Text,
  ...typography.T_20_Bold,
});

export const form = css({
  marginTop: utils.remConverter(150),
});

export const ctaContainer = css({
  padding: `0 ${utils.remConverter(16)} ${utils.remConverter(32)}`,
});

export const formLabel = css({
  color: colors.Secondary_Black_Text,
  marginBottom: utils.remConverter(20),
  ...typography.T_16_Semibold,
  padding: `0 ${utils.remConverter(16)}`,
});

export const formGroup = css({
  marginBottom: utils.remConverter(20),
  display: `flex`,
  padding: `0 ${utils.remConverter(16)}`,
});

export const mobile = css({
  width: `100%`,
});

export const input = css({
  width: `100%`,
  height: utils.remConverter(52),
  padding: utils.remConverter(12),
  color: colors.Primary_Blue,
  backgroundColor: colors.Primary_Bg_Grey,
  boxShadow: `inset -2px -2px 10px #FAFBFF, inset 2px 2px 10px #C6C9D3`,
  borderRadius: 10,
  border: `0`,
  ...typography.T_20_Regular,
  textAlign: `center`,
  '&: focus': {
    outlineColor: colors.Primary_Blue,
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

export const labelValue = css({
  color: colors.Secondary_Black_Text,
  fontWeight: 800,
});

export const remaining = css({
  display: `flex`,
  justifyContent: `space-between`,
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

export const pinStyle = {
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

export const InvalidPinStyle = {
  height: utils.remConverter(52),
  padding: utils.remConverter(12),
  color: colors.Tertiary_Red,
  backgroundColor: colors.Primary_Bg_Grey,
  boxShadow: `inset -2px -2px 10px #FAFBFF, inset 2px 2px 10px #C6C9D3`,
  border: `3px solid ${colors.Tertiary_Red}`,
  borderRadius: utils.remConverter(10),
  ...typography.T_20_Regular,
  textAlign: `center`,
  aspectRatio: `1/1`,
};

export const successPinStyle = {
  width: `100%`,
  height: `52px`,
  padding: `12px`,
  color: colors.Primary_Blue,
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

export const loader = css({
  width: utils.remConverter(25),
  marginLeft: utils.remConverter(10),
});
