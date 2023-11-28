import { colors, typography, utils } from '@styles/shared';
import { css } from '@emotion/react';
import Colors from '@styles/shared/colors';
import Typography from '@styles/shared/typography';

export const feeDetailRow = css({
  margin: `${utils.remConverter(16)} ${utils.remConverter(13)}`,
});

export const cta = css({
  width: `100% !important`,
  margin: 0,
  ...typography.T_16_Semibold,
});

export const ctaContainer = css({
  backgroundColor: colors.Secondary_White,
  boxShadow: colors.Shadow_Btn_Box,
  position: `sticky`,
  width: `var(--hocWidth)`,
  bottom: 0,
  padding: utils.remConverter(16),
});

export const transactionDetailsContainer = css({
  padding: `${utils.remConverter(16)}`,
});

export const transactionDetailsWrapper = css({
  boxShadow: colors.Shadow_Card_Outer_Smooth,

  display: `flex`,

  borderRadius: 4,
});

export const setPriceHeading = css({
  ...typography.T_24_Bold,
  margin: `${utils.remConverter(8)} ${utils.remConverter(
    13,
  )} ${utils.remConverter(16)} ${utils.remConverter(13)}`,
});

export const priceHeading = css({
  ...typography.T_16_Semibold,
  margin: `0 ${utils.remConverter(13)} ${utils.remConverter(
    12,
  )} ${utils.remConverter(13)}`,
});

export const formMinLabel = css({
  color: colors.Secondary_Black_Text,
  marginRight: utils.remConverter(12),
  ...typography.T_12_Regular,
});

export const transactionsDetailsInfoLink = css({
  color: colors.Primary_Blue,
  fontWeight: 800,
  cursor: `pointer`,
});

export const modifyPriceDescription = css({
  ...typography.T_16_Regular,
  color: colors.Secondary_Black_Text,
  padding: `0 ${utils.remConverter(16)}`,
  marginBottom: utils.remConverter(16),
});
