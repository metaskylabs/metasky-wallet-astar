import { colors, typography, utils } from '@styles/shared';
import { css } from '@emotion/react';

export const inputContainer = css({
  marginBottom: `${utils.remConverter(26)}`,
  padding: `0 ${utils.remConverter(16)}`,
});

export const label = css({
  ...typography.T_14_Regular,
  color: colors.Secondary_Black_Text,
});

export const inputTextField = css({
  ...typography.T_16_Regular,
  color: colors.Secondary_Black_Text,
  opacity: `1`,
  background: colors.Primary_Bg_Grey,
  border: `none`,
  boxShadow: colors.Shadow_Input_Inner_Smooth,
  borderRadius: 4,
  width: `100%`,
  height: 48,
  padding: utils.remConverter(12),
  marginTop: utils.remConverter(8),
  WebkitAppearance: `none`,
  '&: focus': {
    outline: `none`,
  },
});
