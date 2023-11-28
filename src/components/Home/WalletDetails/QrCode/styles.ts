import { css } from '@emotion/react';
import { colors, typography, utils } from '@styles/shared';

export const walletAddressQrCode = css({
  background: colors.Secondary_White,
  overflow: `hidden`,
  borderRadius: 4,
  maxWidth: utils.remConverter(180),
  maxHeight: utils.remConverter(180),
  margin: `0 auto ${utils.remConverter(24)}`,
});

export const divider = css({
  border: `${utils.remConverter(1)} solid ${colors.Grey_Border}`,
});

export const walletAddressCopyLink = css({
  margin: `${utils.remConverter(24)} 0 ${utils.remConverter(45)}`,
  display: `flex`,
  flexDirection: `column`,
  gap: utils.remConverter(20),
});

export const walletAddressCopyLinkTitle = css({
  ...typography.T_16_Bold,
  color: colors.Secondary_Black_Text,
});

export const walletAddressLink = css({
  ...typography.T_14_Regular,
  backgroundColor: colors.Primary_Bg_Grey,
  boxShadow: colors.Shadow_Info_Inner_Smooth,
  borderRadius: 4,
  padding: `${utils.remConverter(12)} ${utils.remConverter(8)}`,
  color: colors.Secondary_Black_Text,
  overflow: `auto`,
});

export const ctaContainer = css({
  padding: `0 ${utils.remConverter(16)} ${utils.remConverter(32)}`,
});

export const wrapper = css({
  padding: `0 ${utils.remConverter(16)}`,
});
