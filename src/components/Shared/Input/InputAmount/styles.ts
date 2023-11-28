import { css } from '@emotion/react';
import { colors, typography, utils } from '@styles/shared';

export const label = css([
  { ...typography.T_14_Bold, color: colors.Secondary_Black_Text },
  utils.mb(7),
]);

export const inputContainer = css({
  padding: `${utils.remConverter(18)} 0`,
  borderRadius: utils.remConverter(4),
  color: colors.Secondary_Black_Text,
  width: `100%`,
});

export const amountContainer = css({
  display: `flex`,
  gap: utils.remConverter(8),
});

export const currencyContainer = css({
  flex: `0 0 78px`,
  // position: `relative`,
});

export const input = css({
  width: `100%`,
  borderRadius: utils.remConverter(5),
  lineHeight: utils.remConverter(24),
  border: 0,
  backgroundColor: colors.Primary_Bg_Grey,
  boxShadow: colors.Shadow_Input_Inner_Smooth,
  padding: `${utils.remConverter(6)} ${utils.remConverter(19)}`,
  color: colors.Secondary_Black_Text,
  transition: `0.3s`,
  WebkitAppearance: `none`,

  ...typography.T_16_Semibold,
  '& :placeholder': {
    color: colors.Grey_Text,
  },
  '&:focus': {
    outline: `none`,
  },
});

export const description = css([
  {
    ...typography.T_14_Bold,
  },
  utils.mt(10),
]);
