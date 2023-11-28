import { css } from '@emotion/react';
import { colors, utils } from '@styles/shared';

export const wrapper = css({
  display: `flex`,
  flexDirection: `column`,
  justifyContent: `center`,
  alignItems: `center`,
  height: `100%`,
  paddingBottom: utils.remConverter(50),
});
export const walletAddressBarcode = css({
  backgroundColor: colors.Secondary_White,
  borderRadius: 4,
  margin: `${utils.remConverter(40)} auto`,
  width: utils.remConverter(250),
  height: utils.remConverter(250),
  overflow: `hidden`,
});

export const buttonWrapper = css({
  background: colors.Secondary_White,
  padding: utils.remConverter(16),
});
