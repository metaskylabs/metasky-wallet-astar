import { css } from '@emotion/react';
import { colors, utils } from '@styles/shared';

export const imgWrapper = css({
  borderRadius: 50,
  boxShadow: colors.Shadow_Wallet_Stack,
  width: utils.remConverter(32),
  height: utils.remConverter(32),
  padding: `${utils.remConverter(5)} ${utils.remConverter(8)}`,
  border: colors.Wallet_Stack_White_Border,
  boxSizing: `border-box`,
});

export const overlap = css({
  background: colors.MetaMask_Orange,
  marginLeft: utils.remConverter(-8),
});

export const container = css({
  display: `flex`,
  width: utils.remConverter(76),
});
