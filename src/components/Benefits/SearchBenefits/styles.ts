import { colors, typography, utils } from '@styles/shared';
import { css } from '@emotion/react';

export const inputFormInputWrapper = css({
  position: `relative`,
  width: `100%`,
});

export const inputFormInput = css({
  ...typography.T_16_Regular,
  width: `100%`,
  height: utils.remConverter(56),
  border: 0,
  backgroundColor: colors.Primary_Bg_Grey,
  boxShadow: colors.Shadow_Input_Inner_Smooth,
  WebkitAppearance: `none`,
  color: colors.Secondary_Black_Text,
  padding: utils.remConverter(16),
  borderRadius: 10,
  transition: `0.3s`,
  '& :placeholder': {
    color: colors.Grey_Text,
    ...typography.T_14_Regular,
  },
  '&: focus': {
    outline: `none`,
  },
});

export const inputFormInputIcon = css({
  position: `absolute`,
  right: 0,
  top: 0,
  transform: `translateY(5px)`,
  width: utils.remConverter(24),
  height: utils.remConverter(24),
  margin: `${utils.remConverter(12)} ${utils.remConverter(8)}`,
});
