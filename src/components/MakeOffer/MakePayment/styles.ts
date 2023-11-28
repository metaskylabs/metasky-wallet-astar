import { css } from '@emotion/react';
import { colors, typography, utils } from '@styles/shared';

export const close = css({
  position: `absolute`,
  right: 0,
  top: 0,
  margin: utils.remConverter(24),
  zIndex: 2,
  cursor: `pointer`,
});

export const container = css({
  height: `100%`,
  overflowX: `hidden`,
});

export const walletIcon = css({
  background: colors.Grey_Border,
  width: utils.remConverter(142),
  height: utils.remConverter(140),
  borderRadius: `100%`,
  marginBottom: utils.remConverter(19),
});

export const paymentDescription = css({
  ...typography.T_20_Bold,
  color: colors.Secondary_Black_Text,
  width: utils.remConverter(222),
  textAlign: `center`,
});

export const verifyPaymentDescription = css({
  ...typography.T_16_Regular,
  color: colors.Secondary_Black_Text,
  margin: `${utils.remConverter(12)} ${utils.remConverter(16)}`,
  textAlign: `center`,
});

export const verifyPaymentStatus = css({
  ...typography.T_20_Bold,
  color: colors.Secondary_Black_Text,
});

export const successTitle = css({
  ...typography.T_28_Bold,
  color: colors.Secondary_Black_Text,
  textAlign: `center`,
});

export const successDescription = css({
  ...typography.T_20_Regular,
  color: colors.Secondary_Black_Text,
  textAlign: `center`,
});

export const verifyPaymentClockTimer = css({
  ...typography.T_16_Semibold,
  color: colors.Primary_Blue,
  marginLeft: utils.remConverter(12),
});

export const verifyTimerContainer = css({
  background: colors.Primary_Bg_Grey,
  boxShadow: colors.Shadow_Info_Inner_Sharp,
  borderRadius: 4,
  padding: `${utils.remConverter(20)} ${utils.remConverter(62)}`,
  margin: `${utils.remConverter(8)} 0`,
});

export const buttonContainer = css({
  margin: utils.remConverter(16),
});

export const success = css({
  zIndex: 1,
  position: `relative`,
});

export const confetiAnimation = css({
  zIndex: -1,
  position: `absolute`,
  height: `100vh`,
  width: `100vw`,
});

export const transactionStatusContainer = css({
  background: colors.Secondary_White,
  borderRadius: 4,
  padding: `${utils.remConverter(12)} ${utils.remConverter(14)}`,
  textAlign: `center`,
});

export const regularText = css({
  ...typography.T_14_Regular,
  color: colors.Secondary_Black_Text,
});

export const semiBoldText = css({
  ...typography.T_12_Semibold,
  color: colors.Secondary_Black_Text,
});

export const divider = css({
  margin: `${utils.remConverter(12)} 0`,
});
