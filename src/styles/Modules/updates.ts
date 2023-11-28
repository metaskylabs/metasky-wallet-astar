import { css } from '@emotion/react';
import { colors, utils } from '@styles/shared';

export const container = css({
  padding: `${utils.remConverter(25)} ${utils.remConverter(16)}`,
});
export const headerWrapper = css({
  marginBottom: utils.remConverter(30),
});

export const loaderContentInfo = css({
  textAlign: `center`,
  color: colors.Secondary_Black_Text,
});

export const emptyNotificationContainer = css({
  display: `grid`,
  height: `100%`,
  width: `100%`,
  position: `absolute`,
});

export const notificationList = css({
  height: `100%`,
  gap: utils.remConverter(24),
  marginBottom: utils.remConverter(24),
});
export const EmptyStateContainer = css({
  flexGrow: 1,
});

export const emptyWrapper = css({
  height: `100%`,
  display: `flex`,
  flexDirection: `column`,
  padding: `0 ${utils.remConverter(16)}`,
});
