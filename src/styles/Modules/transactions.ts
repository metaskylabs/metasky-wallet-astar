import { css } from '@emotion/react';
import { colors, typography } from '@styles/shared';
import utils from '@styles/shared/utils';

export const transactionsHeader = css({
  padding: `${utils.remConverter(25)} ${utils.remConverter(16)}`,
});

export const header = css({
  width: `100%`,
});

export const emptyTransaction = css({
  position: `absolute`,
  top: `50%`,
  right: `50%`,
  transform: `translateX(20px)`,
});

export const loadingTransactions = css({
  position: `absolute`,
  top: `40%`,
  left: `50%`,
  transform: `translateX(-15px)`,
});

export const emptyTransactionContainer = css({
  display: `grid`,
  height: `100%`,
  width: `100%`,
  position: `absolute`,
});

export const loaderContentInfo = css({
  textAlign: `center`,
  color: colors.Secondary_Black_Text,
});

export const loadMoreButton = css({
  ...typography.T_14_Bold,
  padding: `0 ${utils.remConverter(15)}`,
  width: `100%`,
  margin: `0`,
  borderRadius: 4,
});

export const loadMoreContainer = css({
  display: `flex`,
  justifyContent: `center`,
  marginBottom: utils.remConverter(16),
  padding: `0 ${utils.remConverter(16)}`,
});

export const loadingContainer = css({
  marginBottom: utils.remConverter(16),
});
