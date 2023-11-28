import { css } from '@emotion/react';
import { colors, utils } from '../shared';

export const transactionDetailsContainer = css({
  boxShadow: colors.Shadow_Card_Outer_Smooth,
  margin: `0 ${utils.remConverter(13)}`,
  display: `flex`,
  // minHeight: utils.remConverter(96),
  borderRadius: 4,
});

export const transactionConfetto = css({
  width: `100%`,
  marginBottom: utils.remConverter(24),
});

export const transactionsHeader = css({
  padding: `${utils.remConverter(25)} ${utils.remConverter(16)}`,
});

export const header = css({
  width: `100%`,
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

export const senderDetails = css({
  margin: `${utils.remConverter(4)} ${utils.remConverter(12)}`,
  background: colors.Secondary_White,
  borderRadius: 4,
  padding: utils.remConverter(10),
});

export const receiverDetails = css({
  margin: `${utils.remConverter(4)} ${utils.remConverter(
    12,
  )} ${utils.remConverter(30)} ${utils.remConverter(12)}`,
  background: colors.Secondary_White,
  borderRadius: 4,
  padding: utils.remConverter(10),
});

export const fromToContainer = css({
  display: `flex`,
  flexDirection: `column`,
});

export const arrowContainer = css({
  width: `auto`,
});
