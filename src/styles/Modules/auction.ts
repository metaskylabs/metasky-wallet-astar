import { css } from '@emotion/react';
import { colors, typography, utils } from '@styles/shared';
import Typography from '@styles/shared/typography';

export const topSectionWrapper = css({
  position: `relative`,
});

export const backButton = css({
  position: `absolute`,
  top: `0`,
  left: `0`,
  margin: `${utils.remConverter(20)}`,
});
export const name = css({
  ...typography.T_20_Bold,
  margin: `${utils.remConverter(54)} 0 ${utils.remConverter(20)}`,
  textAlign: `center`,
});
export const buttonWrapper = css({
  background: colors.Secondary_White,
  padding: utils.remConverter(16),
});

export const detailsContainer = css({
  position: `relative`,
  padding: `0 ${utils.remConverter(14)}`,
});

export const sectionWrapper = css({
  marginBottom: utils.remConverter(40),
});
export const timerWrapper = css({
  margin: `0 auto`,
  display: `flex`,
  flexDirection: `row`,
  justifyContent: `center`,
  marginBottom: utils.remConverter(12),
});

export const auctionEndTitle = css({
  ...Typography.T_16_Regular,
  color: colors.Secondary_Black_Text,
  textAlign: `center`,
  marginBottom: utils.remConverter(12),
});

export const loadingContainer = css({
  padding: `0 ${utils.remConverter(16)}`,
});
