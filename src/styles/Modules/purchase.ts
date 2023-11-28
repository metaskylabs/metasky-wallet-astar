import { css } from '@emotion/react';
import { colors, mixins, typography, utils } from '../shared';

export const nftHeader = css({
  padding: `${utils.remConverter(20)} ${utils.remConverter(16)}`,
});

export const nftTitle = css({
  ...typography.T_20_Bold,
  width: `100%`,
  textAlign: `center`,
});

export const transactionInfoStyles = css({
  margin: `${utils.remConverter(20)} ${utils.remConverter(16)}`,
  marginBottom: utils.remConverter(150),
});

export const transactionValidity = css({
  margin: `${utils.remConverter(10)} ${utils.remConverter(16)}`,
  backgroundColor: colors.Secondary_White,
  padding: utils.remConverter(12),
  borderRadius: 10,
});

export const transactionValidityText = css({
  ...typography.T_14_Regular,
  color: colors.Secondary_Black_Text,
  margin: 0,
});

export const transactionValiditySec = css({
  ...typography.T_14_Bold,
  color: colors.Secondary_Black_Text,
});

export const shareNftContainer = css([
  {
    width: `var(--hocWidth)`,
    bottom: 0,
    zIndex: 10,
  },
]);

export const filterReset = css({
  ...typography.T_16_Bold,
  flex: 1,
  margin: utils.remConverter(16),
});

export const filterApply = css({
  ...typography.T_16_Bold,
  flex: 1,
  margin: `${utils.remConverter(16)} ${utils.remConverter(
    16,
  )} ${utils.remConverter(16)} ${utils.remConverter(16)}`,
});

export const loader = css({
  position: `absolute`,
  top: `40%`,
  left: `50%`,
  transform: `translateX(-15px)`,
});

export const loaderContentInfo = css({
  textAlign: `center`,
  color: colors.Secondary_Black_Text,
});

export const toastLink = css({
  border: 0,
  background: `none`,
  color: colors.Secondary_White,
  textDecoration: `underline`,
  padding: `0 ${utils.remConverter(5)}`,
});

export const staticHeight = css({
  height: `100%`,
});

export const transferDetailsNft = css({
  borderRadius: 4,
  minHeight: utils.remConverter(96),
  display: `flex`,
  boxShadow: colors.Shadow_Card_Outer_Smooth,
  margin: utils.remConverter(16),
});

export const successContainer = css({
  padding: `${utils.remConverter(24)} ${utils.remConverter(16)}`,
});
