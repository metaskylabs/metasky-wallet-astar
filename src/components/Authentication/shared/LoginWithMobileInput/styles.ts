import { css } from '@emotion/react';
import { colors, mixins, typography, utils } from '@styles/shared';
export const loginForm = css({
  padding: `20px 15px`,
});

export const icon = css({
  display: `flex`,
  alignItems: `center`,
  justifyContent: `center`,
  width: utils.remConverter(142),
  height: utils.remConverter(142),
  margin: `auto`,
  marginTop: utils.remConverter(43),
  marginBottom: utils.remConverter(43),
  background: colors.Grey_Border,
  borderRadius: `50%`,
});

export const formLabel = css({
  color: colors.Secondary_Black_Text,
  ...typography.T_16_Semibold,
});

export const formGroup = css({
  marginTop: `20px`,
  display: `flex`,
});

export const country = css({
  flex: `0 0 94px`,
  width: `94px`,
  marginRight: `8px`,
  position: `relative`,
});

export const input = css({
  width: `100%`,
  height: utils.remConverter(48),
  padding: utils.remConverter(12),
  color: colors.Secondary_Black_Text,
  backgroundColor: colors.Primary_Bg_Grey,
  boxShadow: colors.Shadow_Input_Inner_Smooth,
  borderRadius: 4,
  border: `0`,
  WebkitAppearance: `none`,
  ...typography.T_16_Regular,
  '&: focus': {
    outline: `none`,
  },
  '&::placeholder': {
    color: colors.Grey_Text,
    textTransform: `none`,
  },
});

export const error = css({
  boxShadow: colors.Shadow_Input_Inner_Lighter,
  border: `${utils.remConverter(1)} solid ${colors.Tertiary_Red}`,
});

export const errorMessage = css({
  ...typography.T_12_Regular,
  color: colors.Tertiary_Red,
  marginTop: utils.remConverter(8),
  marginLeft: utils.remConverter(5),
});

export const mobile = css({
  flex: `1`,
});

export const buttonContainer = css([
  {
    position: `absolute`,
    display: `flex`,
    bottom: 0,
    width: `var(--hocWidth)`,
    padding: `0 ${utils.remConverter(16)} ${utils.remConverter(32)}`,
    color: colors.Secondary_Black_Text,
    zIndex: 9,
  },
]);

export const loader = css({
  width: utils.remConverter(25),
  marginLeft: utils.remConverter(10),
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
