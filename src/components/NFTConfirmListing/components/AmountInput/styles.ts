import { css } from '@emotion/react';
import { colors, typography, utils } from '@styles/shared';

export const formGroup = css({
  margin: `${utils.remConverter(20)} ${utils.remConverter(
    13,
  )} ${utils.remConverter(52)} ${utils.remConverter(13)}`,
  display: `flex`,
});
export const currency = css({
  flex: `0 0 94px`,
  width: `94px`,
  marginRight: `8px`,
  position: `relative`,
});
export const input = css({
  width: `100%`,
  height: `48px`,
  padding: `12px`,
  color: colors.Secondary_Black_Text,
  backgroundColor: colors.Primary_Bg_Grey,
  boxShadow: colors.Shadow_Input_Inner_Smooth,
  borderRadius: `10px`,
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

export const amount = css({
  flex: `1`,
});
export const errorMessage = css({
  ...typography.T_12_Regular,
  color: colors.Tertiary_Red,
  marginTop: utils.remConverter(4),
});
