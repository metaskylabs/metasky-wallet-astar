import { colors, typography, utils } from '@styles/shared';
import { css } from '@emotion/react';

export const sendnftHeader = css({
  marginBottom: utils.remConverter(24),
});

export const sendnftImage = css({
  height: utils.remConverter(64),
  width: utils.remConverter(64),
  borderRadius: utils.remConverter(10),
  backgroundColor: colors.Grey_Border,
});

export const sendnftTitle = css({
  ...typography.T_20_Bold,
  marginLeft: utils.remConverter(12),
});

export const walletAddressBarcode = css({
  backgroundColor: colors.Secondary_White,
  borderRadius: 4,
  margin: `${utils.remConverter(40)} auto`,
  maxWidth: utils.remConverter(180),
  maxHeight: utils.remConverter(180),
  overflow: `hidden`,
});

export const anotherWalletImage = css({
  width: `100%`,
});

export const divider = css({
  border: `${utils.remConverter(1)} solid ${colors.Grey_Border}`,
});

export const walletAddressCopyLink = css({
  margin: `${utils.remConverter(17)} 0`,
});

export const walletAddressCopyLinkTitle = css({
  ...typography.T_16_Bold,
  color: colors.Secondary_Black_Text,
});

export const walletAddressCopyLinkIcon = css({
  width: utils.remConverter(24),
  height: utils.remConverter(24),
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

export const anotherWalletTitle = css({
  ...typography.T_16_Bold,
  color: colors.Secondary_Black_Text,
  marginBottom: utils.remConverter(20),
});

export const anotherWalletContainer = css({
  ...typography.T_14_SemiBold,
  color: colors.Secondary_Black_Text,
});

export const anotherWalletMetaskyLink = css({
  color: colors.Primary_Blue,
});

export const receiveDescription = css({
  marginTop: utils.remConverter(28),
  marginBottom: utils.remConverter(20),
});

export const receiveNetworkTitle = css({
  ...typography.T_14_Bold,
  textAlign: `center`,
  marginBottom: utils.remConverter(10),
});

export const receiveNetworks = css({
  display: `flex`,
  justifyContent: `center`,
  gap: utils.remConverter(24),
  '& > label': {
    marginRight: utils.remConverter(12),
    ':last-child': {
      marginRight: utils.remConverter(0),
    },
  },
});
