import { css } from '@emotion/react';
import { colors, mixins, typography, utils } from '@styles/shared';

export const loginForm = css({
  marginTop: `46px`,
  padding: `0 16px`,
});
export const formLabel = css({
  color: colors.Secondary_Black_Text,
  marginBottom: utils.remConverter(20),
  ...typography.T_16_Semibold,
});

export const mobile = css({
  flex: `1`,
});

export const formGroup = css({
  display: `flex`,
  marginBottom: utils.remConverter(8),
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

export const errorMessage = css({
  ...typography.T_12_Regular,
  color: colors.Tertiary_Red,
  marginTop: utils.remConverter(8),
  marginLeft: utils.remConverter(5),
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

export const loader = css({
  width: utils.remConverter(25),
  marginLeft: utils.remConverter(10),
});
export const buttonContainer = css([
  {
    padding: `${utils.remConverter(0)} ${utils.remConverter(
      16,
    )} ${utils.remConverter(32)}`,
    background: colors.Primary_Bg_Grey,
    position: `absolute`,
    bottom: `0`,
    width: `var(--hocWidth)`,
    zIndex: 9,
  },
]);

export const error = css({
  boxShadow: colors.Shadow_Input_Inner_Lighter,
  border: `${utils.remConverter(1)} solid ${colors.Tertiary_Red}`,
});
