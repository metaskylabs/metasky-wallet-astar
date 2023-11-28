import { colors, typography, utils } from '@styles/shared';
import { css } from '@emotion/react';

export const inputFormControl = css({
  marginBottom: utils.remConverter(30),
  overflow: `hidden`,
});

export const inputFormLabel = css({
  ...typography.T_16_Semibold,
  marginBottom: utils.remConverter(8),
  marginRight: utils.remConverter(8),
  // width: `30%`,
});

export const iconLabel = css({
  marginLeft: utils.remConverter(5),
  color: colors.Secondary_Black_Text,
});

export const inputFormImage = css({
  width: utils.remConverter(20),
  height: utils.remConverter(20),
});

export const inputFormInputWrapper = css({
  position: `relative`,
  width: `100%`,
});

export const inputFormInput = css({
  width: `100%`,
  borderRadius: `4px`,
  height: utils.remConverter(48),
  border: 0,
  backgroundColor: colors.Primary_Bg_Grey,
  boxShadow: colors.Shadow_Circle_smooth,
  padding: `${utils.remConverter(12)} ${utils.remConverter(8)}`,
  color: colors.Secondary_Black_Text,
  paddingRight: utils.remConverter(37),
  transition: `0.3s`,
  WebkitAppearance: `none`,
  ...typography.T_16_Regular,
  '& :placeholder': {
    color: colors.Grey_Text,
  },
  '&:focus': {
    outline: `none`,
  },
});

export const inputFormInputIcon = css({
  position: `absolute`,
  right: 0,
  top: 0,
  width: utils.remConverter(24),
  height: utils.remConverter(24),
  margin: `${utils.remConverter(12)} ${utils.remConverter(8)}`,
  cursor: `pointer`,
});

export const errorMessage = css({
  ...typography.T_12_Regular,
  color: colors.Tertiary_Red,
  marginTop: utils.remConverter(4),
});
