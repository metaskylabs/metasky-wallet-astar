import { css } from '@emotion/react';
import { colors, mixins, typography, utils } from '@styles/shared';

export const kycContent = css({
  ...typography.T_12_Regular,
  color: colors.Secondary_Black_Text,
  margin: `${utils.remConverter(28)} ${utils.remConverter(
    16,
  )} ${utils.remConverter(20)} ${utils.remConverter(16)}`,
});

export const formHeight = css({
  height: `80%`,
  position: `relative`,
});

export const kycContainer = css([
  {
    height: `100vh`,
  },
  { ...mixins.desktopHeight },
]);

export const loginForm = css({
  // margin: `64px ${utils.remConverter(20)} ${utils.remConverter(43.54)} 0`,
  padding: `0 15px`,
});

export const errorMessage = css({
  ...typography.T_12_Regular,
  color: colors.Tertiary_Red,
  marginTop: utils.remConverter(-10),
  marginLeft: utils.remConverter(5),
});

export const button = css({
  background: colors.Primary_Yellow,
  boxShadow: colors.Shadow_Btn_P_Outer_Sharp,
  borderRadius: `50px`,
  padding: `12px`,
  width: `100%`,
  border: `0`,
  textTransform: `uppercase`,
  color: colors.Secondary_Black_Text,
  ...typography.T_20_Bold,
});

export const buttonContainer = css([
  {
    width: `var(--hocWidth)`,
    padding: utils.remConverter(16),
    position: `fixed`,
    bottom: 0,
  },
]);

export const loginContainer = css({
  marginBottom: utils.remConverter(20),
});

export const label = css({
  ...typography.T_16_Bold,
  color: colors.Secondary_Black_Text,
});

export const uppercase = css({
  textTransform: `uppercase`,
});

export const input = css({
  ...typography.T_16_Regular,
  color: colors.Secondary_Black_Text,
  padding: utils.remConverter(12),
  backgroundColor: colors.Primary_Bg_Grey,
  boxShadow: colors.Shadow_Input_Inner_Smooth,
  borderRadius: 10,
  border: 0,
  marginBottom: utils.remConverter(20),
  width: `100%`,
  WebkitAppearance: `none`,
  '&:focus': {
    outline: `none`,
    border: `1px solid ${colors.Primary_Blue}`,
    boxShadow: colors.Shadow_Input_Inner_Lighter,
  },
  '& > .react-date-picker__wrapper': {
    border: 0,
  },
});

export const kycFormContainer = css({
  marginBottom: utils.remConverter(20),
});

export const kycEncryptedImg = css({
  width: utils.remConverter(15),
  height: utils.remConverter(14),
});

export const loader = css({
  width: utils.remConverter(25),
  marginLeft: utils.remConverter(10),
});
