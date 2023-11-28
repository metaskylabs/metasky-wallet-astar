import { css } from '@emotion/react';
import { colors, typography, utils } from '@styles/shared';

export const listWrapper = css({
  display: `flex`,
  flexDirection: `column`,
  gap: utils.remConverter(16),
  padding: `0 ${utils.remConverter(16)}`,
});

export const listItem = css({
  display: `flex`,
  justifyContent: `space-between`,
  padding: utils.remConverter(16),
  boxShadow: colors.Shadow_Input_Inner_Hover,
  borderRadius: 4,
});

export const walletDetails = css({
  padding: utils.remConverter(9),
});

export const walletLogo = css({
  width: utils.remConverter(24),
  height: utils.remConverter(24),
  display: `flex`,
  alignItems: `center`,
  marginRight: utils.remConverter(8),
});

export const walletName = css({
  ...typography.T_16_Bold,
  color: colors.Secondary_Black_Text,
});
