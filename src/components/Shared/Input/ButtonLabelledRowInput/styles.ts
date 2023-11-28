import { colors, typography, utils } from '@styles/shared';
import { css } from '@emotion/react';

export const inputFormControl = css({
  overflow: `hidden`,
});

export const inputFormLabel = css({
  ...typography.T_16_Semibold,
  // marginBottom: utils.remConverter(8),
  marginRight: utils.remConverter(8),
  width: `30%`,
  minWidth: `30%`,
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
  borderRadius: utils.remConverter(4),
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
  width: utils.remConverter(54),
  height: utils.remConverter(24),
  margin: `${utils.remConverter(12)} ${utils.remConverter(8)}`,
  cursor: `pointer`,
});

export const errorMessage = css({
  ...typography.T_12_Regular,
  color: colors.Tertiary_Red,
  marginTop: utils.remConverter(4),
});
export const inputFormButton = css({
  fontSize: `0.8rem`,
  height: utils.remConverter(32),
  width: utils.remConverter(64),
  margin: 0,
  borderRadius: utils.remConverter(16),
});
export const description = css({
  ...typography.T_12_Regular,
  color: colors.Tertiary_Green,
  marginTop: utils.remConverter(4),
});
export const descriptionWrapper = css({
  marginLeft: utils.remConverter(130),
});
