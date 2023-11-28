import { css } from '@emotion/react';
import { colors, typography, utils } from '@styles/shared';

export const loginForm = css({
  margin: `10px 0 20px 0`,
  padding: `0 16px`,
});
export const formLabel = css({
  color: colors.Secondary_Black_Text,
  marginBottom: utils.remConverter(10),
  ...typography.T_16_Semibold,
});
export const mobile = css({
  flex: `1`,
});

export const formGroup = css({
  marginBottom: utils.remConverter(20),
});
export const input = css({
  width: `100%`,
  height: `48px`,
  padding: `12px`,
  color: colors.Secondary_Black_Text,
  backgroundColor: colors.Primary_Bg_Grey,
  boxShadow: colors.Shadow_Input_Inner_Smooth,
  WebkitAppearance: `none`,
  borderRadius: 4,
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

export const button = css({
  marginTop: `${utils.remConverter(40)}`,
});
export const dropdown = css({
  width: `100%`,
  height: `48px`,
  padding: `12px`,
  color: colors.Secondary_Black_Text,
  backgroundColor: colors.Primary_Bg_Grey,
  boxShadow: colors.Shadow_Input_Inner_Smooth,
  borderRadius: 4,
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
