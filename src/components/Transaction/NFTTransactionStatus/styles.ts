import { css } from '@emotion/react';
import { colors, typography } from '@styles/shared';
import utils from '@styles/shared/utils';

export const transactionsStatusInfoTab = css({
  margin: `${utils.remConverter(40)} ${utils.remConverter(16)}`,
  borderRadius: 4,
  background: colors.Secondary_White,
});

export const transactionsStatusInfoTabTitle = css({
  backgroundColor: colors.Grey_Border,
  padding: `${utils.remConverter(20)}`,
  borderRadius: `4px 4px 0 0`,
});

export const transactionsStatusTabImage = css({
  marginRight: utils.remConverter(12),
});

export const transactionsStatusInfoTitleContent = css({
  ...typography.T_16_Bold,
  color: colors.Secondary_Black_Text,
});

export const transactionStatusState = css({
  ...typography.T_14_Semibold,
  padding: `${utils.remConverter(8)} ${utils.remConverter(10)}`,
  borderRadius: utils.remConverter(4),
  textTransform: `capitalize`,
  whiteSpace: `nowrap`,
  minWidth: utils.remConverter(80),
  textAlign: `center`,
});

export const transactionStatusStateSuccess = css({
  backgroundColor: colors.Tertiary_Toast_Green,
  color: colors.Secondary_White,
});

export const transactionStatusStateFailure = css({
  backgroundColor: colors.Tertiary_Red,
  color: colors.Secondary_White,
});

export const transactionStatusStatePending = css({
  backgroundColor: colors.Tertiary_Darker_Yellow,
});

export const transactionsStatusInfoTabContainer = css({
  padding: `${utils.remConverter(25)} ${utils.remConverter(15)}`,
});

export const transactionStatusTimelineItem = css({});

export const transactionContentLineItem = css({
  margin: `${utils.remConverter(6)} 0`,
});

export const transactionStatusTimelineDate = css({
  ...typography.T_10_Regular,
  color: colors.Secondary_Black_Text,
  width: `25%`,
  minWidth: `25%`,
});

export const transactionStatusIconContainer = css({
  position: `relative`,
  margin: `0px 8px`,
  '::after': {
    content: `" "`,
    position: `absolute`,
    top: 0,
    bottom: 0,
    left: `50%`,
  },
});

export const transactionStatusPendingLine = css({
  '::after': {
    borderLeft: `1px solid ${colors.Grey_Border}`,
  },
});

export const transactionStatusSuccessLine = css({
  '::after': {
    borderLeft: `1px solid ${colors.Tertiary_Toast_Green}`,
  },
});

export const transactionStatusFailureLine = css({
  '::after': {
    borderLeft: `1px solid ${colors.Tertiary_Red}`,
  },
});

export const transactionStatusIcon = css({
  width: 16,
  height: 16,
  backgroundColor: `white`,
  borderRadius: 8,
  position: `relative`,
  zIndex: 2,
  display: `flex`,
});

export const transactionStatusIconItem = css({
  width: `100%`,
  height: `100%`,
});

export const statusAnimationIcon = css({
  transform: `translateY(-7px)`,
  width: `100%`,
});

export const transactionStatusDetail = css({
  flex: 1,
  overflow: `hidden`,
  position: `relative`,
  top: utils.remConverter(-4),
  paddingBottom: utils.remConverter(30),
});

export const transactionStatusDetailHeading = css({
  ...typography.T_14_Semibold,
});

export const transactionStatusDetailInfo = css({
  ...typography.T_12_Regular,
  color: colors.Grey_Text,
});

export const transactionStatusDetailComment = css({
  ...typography.T_12_Regular,
  color: colors.Secondary_Black_Text,
});

export const transactionStatusDetailLink = css({
  ...typography.T_12_Semibold,
  color: colors.Primary_Blue,
  cursor: `pointer`,
  width: `fit-content`,
});

export const transactionInfoCopyIcon = css({
  width: utils.remConverter(16),
  height: utils.remConverter(16),
  cursor: `pointer`,
});

export const divider = css({
  border: `${utils.remConverter(1)} solid ${colors.Grey_Border}`,
});

export const support = css({
  color: colors.Primary_Blue,
  cursor: `pointer`,
});
