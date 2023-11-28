import { colors, mixins, typography, utils } from '@styles/shared';
import { css } from '@emotion/react';

export const title = css({
  color: colors.Secondary_Black_Text,
  ...typography.T_20_Bold,
});

export const loginContainer = css([
  {
    // height: `100%`,
  },
  // { ...mixins.desktopHeight },
  { overflowY: `scroll`, paddingBottom: utils.remConverter(83) },
]);

export const loginForm = css({
  marginTop: `46px`,
  padding: `0 16px`,
});

export const formLabel = css({
  color: colors.Secondary_Black_Text,
  marginBottom: utils.remConverter(20),
  ...typography.T_16_Semibold,
});

export const formGroup = css({
  display: `flex`,
  marginBottom: utils.remConverter(8),
});

export const country = css({
  position: `relative`,
  width: `${utils.remConverter(94)} !important`,
  marginRight: `8px`,
});

export const mobile = css({
  flex: `1`,
});

export const input = css({
  width: `100%`,
  height: `48px`,
  padding: `12px`,
  color: colors.Secondary_Black_Text,
  backgroundColor: colors.Primary_Bg_Grey,
  boxShadow: `inset -2px -2px 10px #FAFBFF, inset 2px 2px 10px #C6C9D3`,
  WebkitAppearance: `none`,
  borderRadius: `10px`,
  border: `0`,
  ...typography.T_16_Regular,
  '&: focus': {
    outline: `none`,
  },
  '&::placeholder': {
    color: colors.Grey_Text,
    textTransform: `none`,
  },
});

export const errorMessage = css({
  ...typography.T_12_Regular,
  color: colors.Tertiary_Red,
  marginTop: utils.remConverter(8),
  marginLeft: utils.remConverter(5),
});

export const countryCode = css({
  color: colors.Grey_Text,
  textAlign: `center`,
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

export const authButton = css({
  color: colors.Primary_Blue,
  background: colors.Primary_Bg_Grey,
  boxShadow: colors.Shadow_Card_Outer_Smooth,
  borderRadius: `10px`,
  padding: `12px`,
  width: `100%`,
  border: `0`,
  cursor: `pointer`,
  ...typography.T_16_Semibold,
  marginTop: utils.remConverter(20),
  marginBottom: utils.remConverter(50),
});

export const buttonIcon = css({
  marginRight: utils.remConverter(17),
  lineHeight: 1,
  transform: `translateY(5px)`,
  display: `inline`,
});

export const hr = css({
  height: `1px`,
  background: `#CCD5EC`,
  width: `100%`,
  textAlign: `center`,
  margin: `${utils.remConverter(43.5)} 0 ${utils.remConverter(40)}`,
  zIndex: 1,
});

export const anchorWebkit = css({
  display: `block`,
});

export const hrSpan = css({
  background: colors.Primary_Bg_Grey,
  padding: `0 16px`,
  display: `inline-block`,
  transform: `translateY(-14px)`,
  color: colors.Grey_Text,
  ...typography.T_16_Regular,
});

export const link = css({
  color: colors.Primary_Blue,
  border: `0`,
  background: `transparent`,
  ...typography.T_16_Semibold,
});

export const textCenter = css({
  textAlign: `center`,
  padding: `0 15px`,
  // paddingBottom: utils.remConverter(100),
});

export const buttonContainer = css([
  {
    padding: utils.remConverter(16),
    background: `#F0F0F3`,
    borderTop: `1px solid ${colors.Grey_Border}`,
    position: `fixed`,
    bottom: `0`,
    width: `var(--hocWidth)`,
  },
]);

export const logoContainer = css({
  display: `flex`,
  justifyContent: `center`,
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
  padding: `0 16px`,
  marginTop: `20px`,
});

export const errorContainer = css({
  marginLeft: utils.remConverter(102),
  marginTop: utils.remConverter(-30),
});

export const loader = css({
  width: utils.remConverter(25),
  marginLeft: utils.remConverter(10),
});

export const bottomSheetHeight = css({
  height: `100%`,
  display: `flex`,
  alignItems: `center`,
  justifyContent: `center`,
  borderRadius: 0,
});

export const formHeight = css({
  // height: `70%`,
  // position: `relative`,
});

export const popUpLoginText = css({
  ...typography.T_14_Regular,
  color: colors.Secondary_Black_Text,
});

export const popUpTextContainer = css({
  margin: `0 ${utils.remConverter(16)} 0 ${utils.remConverter(16)}`,
  textAlign: `center`,
  justifyContent: `center`,
});

export const leftAlign = css({
  testAlign: `left`,
});

export const loaderContentInfo = css({
  textAlign: `center`,
  color: colors.Secondary_Black_Text,
});

export const loginUsingOtherOptions = css({
  ...typography.T_16_Semibold,
  color: colors.Primary_Blue,
  textDecoration: `none`,
});

export const metaskyLogo = css({
  maxWidth: utils.remConverter(205),
});
export const metamaskLoginButton = css({
  padding: `${utils.remConverter(16)} ${utils.remConverter(
    16,
  )} 0 ${utils.remConverter(16)}`,
  button: {
    marginBottom: utils.remConverter(0),
  },
});
