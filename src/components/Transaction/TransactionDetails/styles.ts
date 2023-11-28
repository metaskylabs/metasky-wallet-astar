import { css } from '@emotion/react';
import { colors, typography } from '@styles/shared';
import utils from '@styles/shared/utils';

export const pointer = css({
  cursor: `pointer`,
});

export const transactionsDetailsImage = css({
  // aspectRatio: `1.07/1`,
  height: `auto`,
  borderRadius: `4px 0 0 4px`,
});

export const transactionsImg = css({
  width: `100%`,
  height: `100%`,
  borderRadius: `4px 0 0 4px`,
  objectFit: `contain`,
  aspectRatio: `1`,
});
export const transactionsVideo = css({
  width: `auto`,
  minHeight: utils.remConverter(96),
  borderRadius: `4px 0 0 4px`,
  objectFit: `contain`,
});

export const transactionsDetailsInfo = css({
  marginLeft: utils.remConverter(20),
  height: `100%`,
  width: `100%`,
  padding: `${utils.remConverter(14)} 0`,
});

export const transactionsDetailsInfoTitle = css({
  ...typography.T_16_Semibold,
  color: colors.Secondary_Black_Text,
  margin: 0,
  marginBottom: utils.remConverter(10),
});

export const transactionsStatus = css({
  ...typography.T_10_Regular,
  color: colors.Secondary_Black_Text,
});

export const transactionsListStatusContainer = css({
  borderRadius: 10,
  padding: `${utils.remConverter(2)} ${utils.remConverter(22)}`,
  display: `inline-flex`,
  margin: 0,
  alignSelf: `flex-start`,
});

export const transactionsSentStatusContainer = css({
  backgroundColor: colors.Grey_Border,
  color: colors.Secondary_Black_Text,
});

export const transactionsReceievedStatusContainer = css({
  backgroundColor: colors.Tertiary_Green,
  color: colors.Secondary_Black_Text,
});

export const transactionsPendingStatusContainer = css({
  backgroundColor: colors.Primary_Yellow,
  color: colors.Secondary_Black_Text,
});

export const transactionsFailedStatusContainer = css({
  backgroundColor: colors.Tertiary_Red,
  color: colors.Secondary_White,
});

export const transactionAmountDetail = css({
  ...typography.T_12_Semibold,
  width: `fit-content`,
  borderRadius: utils.remConverter(4),
  background: colors.Gradient_Yellow,
  color: colors.Black,
  padding: `${utils.remConverter(4)} ${utils.remConverter(10)}`,
});

export const transactionsETH = css({
  ...typography.T_20_Bold,
  color: colors.Secondary_Black_Text,
  margin: 0,
});

export const transactionsDetailsContent = css({
  display: `flex`,
  flexDirection: `column`,
  justifyContent: `center`,
  height: `100%`,
  width: `100%`,
});
