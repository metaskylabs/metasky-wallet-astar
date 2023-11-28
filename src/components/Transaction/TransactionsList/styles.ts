import { css } from '@emotion/react';
import { colors, typography } from '@styles/shared';
import utils from '@styles/shared/utils';

export const transactionsList = css({
  backgroundColor: colors.Primary_Bg_Grey,
  boxShadow: colors.Shadow_Card_Outer_Smooth,
  margin: `${utils.remConverter(10)} ${utils.remConverter(16)}`,
  display: `flex`,
  flexDirection: `row`,
  borderRadius: 4,
  cursor: `pointer`,
  overflow: `hidden`,
  justifyContent: `flex-start`,
});

export const transactionsListHeader = css({
  flexGrow: 1,
  marginLeft: utils.remConverter(12),
});
export const mediaWrapper = css({});
export const transactionsImageContainer = css({
  width: utils.remConverter(95),
  height: utils.remConverter(95),

  objectFit: `cover`,
  alignSelf: `center`,
});

export const transactionsListTitle = css({
  color: colors.Secondary_Black_Text,
  overflow: `hidden`,
  textOverflow: `ellipsis`,
  display: `-webkit-box`,
  WebkitLineClamp: `1`,
  WebkitBoxOrient: `vertical`,
  wordBreak: `break-all`,
  ...typography.T_14_Bold,
});

export const transactionsListStatusContainer = css({
  borderRadius: 4,
  padding: `${utils.remConverter(2)} ${utils.remConverter(22)}`,
  display: `inline-flex`,
  color: colors.Secondary_White,
});

export const transactionsSentStatusContainer = css({
  backgroundColor: colors.Grey_Border,
  color: colors.Secondary_Black_Text,
});

export const transactionsReceievedStatusContainer = css({
  backgroundColor: colors.Tertiary_Green,
  color: colors.Secondary_White,
});

export const transactionsPendingStatusContainer = css({
  backgroundColor: colors.Primary_Yellow,
  color: colors.Secondary_Black_Text,
});

export const transactionsFailedStatusContainer = css({
  backgroundColor: colors.Tertiary_Red,
  color: colors.Secondary_White,
});

export const transactionsFooter = css({
  display: `flex`,
  alignItems: `flex-end`,
  flexDirection: `column`,
  padding: `${utils.remConverter(20)} ${utils.remConverter(10)}`,
});

export const transactionsFooterQuantity = css({
  color: colors.Secondary_Black_Text,
  margin: 0,
  ...typography.T_12_Semibold,
});

export const transactionsFooterQuantityText = css({
  marginRight: utils.remConverter(2),
  whiteSpace: `nowrap`,
  textAlign: `right`,
  ...typography.T_16_Semibold,
  '@media only screen and (max-width: 400px)': {
    ...typography.T_14_Semibold,
  },
});

export const transactionsFooterDate = css({
  color: colors.Secondary_Black_Text,
  ...typography.T_14_Semibold,
  '@media only screen and (max-width: 400px)': {
    ...typography.T_12_Semibold,
  },
});

export const statusText = css({
  ...typography.T_10_Regular,
  textTransform: `capitalize`,
});
