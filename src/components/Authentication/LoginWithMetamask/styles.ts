import { colors, typography, utils } from '@styles/shared';
import { css } from '@emotion/react';

export const mainWrapper = css({
  height: `100%`,
});

export const title = css({
  color: colors.Secondary_Black_Text,
  ...typography.T_20_Bold,
});

export const container = css({
  height: `100%`,
  width: `100%`,
});

export const logoContainer = css({
  display: `flex`,
  justifyContent: `center`,
  margin: `${utils.remConverter(85)} 0 ${utils.remConverter(60)} 0`,
});

export const textCenter = css({
  textAlign: `center`,
  marginBottom: utils.remConverter(20),
});

export const url = css({
  ...typography.T_12_Regular,
  color: colors.Grey_Text,
  marginLeft: `10px`,
});

export const subTitle = css({
  ...typography.T_14_Regular,
  color: colors.Grey_Text,
});

export const ctaContainer = css({
  display: `flex`,
  justifyContent: `flex-end`,
  padding: `0 16px`,
  marginBottom: utils.remConverter(8),
});

export const cta = css({
  ...typography.T_12_Semibold,
  color: colors.Primary_Blue,
  textDecoration: `none`,
});

export const account = css({
  display: `flex`,
  alignItems: `center`,
  margin: `0 16px 20px 16px`,
  border: `1px solid ${colors.Grey_Border}`,
  padding: `4px`,
  borderRadius: 4,
  background: colors.Secondary_White,
});

export const flexItem = css({
  margin: `8px`,
  display: `flex`,
  justifyContent: `center`,
  alignItems: `center`,
});

export const details = css({
  ...typography.T_14_Regular,
  color: colors.Secondary_Black_Text,
});
export const balance = css({
  ...typography.T_14_Regular,
  color: colors.Grey_Text,
});

export const buttonContainer = css({
  background: colors.Primary_Bg_Grey,
  position: `absolute`,
  display: `flex`,
  bottom: 0,
  width: `100%`,
});

export const primaryButton = css({
  width: `100%`,
});

export const disconnectButton = css({
  ...typography.T_16_Bold,
  margin: utils.remConverter(16),
});

export const continueButton = css({
  ...typography.T_16_Bold,
  width: `50%`,
  margin: `${utils.remConverter(16)} ${utils.remConverter(
    16,
  )} ${utils.remConverter(16)} 0`,
});

export const bottomSheetHeight = css({
  height: `100%`,
  display: `flex`,
  alignItems: `center`,
  justifyContent: `center`,
  borderRadius: 0,
  padding: `0px`,
});

export const bottomSheetHalfHeight = css({
  height: `50%`,
});

export const mb = css({
  marginBottom: utils.remConverter(130),
});

export const box = css({
  display: `flex`,
  alignItems: `center`,
  justifyContent: `center`,
  height: `100vh`,
});

export const imgContainer = css({
  height: utils.remConverter(20),
  width: utils.remConverter(20),
});

export const selectNetwork = css({
  ...typography.T_14_Semibold,
  color: colors.Secondary_Black_Text,
  margin: `${utils.remConverter(29)} auto ${utils.remConverter(8)} auto`,
});

export const polygonImgContainer = css({
  height: utils.remConverter(112),
  width: utils.remConverter(112),
  borderRadius: utils.remConverter(98),
  backgroundColor: colors.Grey_Border,
  margin: `${utils.remConverter(30)} auto ${utils.remConverter(20)} auto`,
  padding: `${utils.remConverter(37)} ${utils.remConverter(32)}`,
});

export const polygonSwitchTitle = css({
  ...typography.T_20_Bold,
  color: colors.Secondary_Black_Text,
  marginBottom: utils.remConverter(12),
  textAlign: `center`,
});

export const polygonSwitchContent = css({
  ...typography.T_16_Regular,
  color: colors.Secondary_Black_Text,
  marginBottom: utils.remConverter(36),
  width: utils.remConverter(333),
  textAlign: `center`,
});

export const polygonSwitchButton = css({
  textTransform: `uppercase`,
  width: `100%`,
  margin: `${utils.remConverter(17)} ${utils.remConverter(
    16,
  )} ${utils.remConverter(17)} ${utils.remConverter(16)}`,
});

export const imgSize = css({
  height: `${utils.remConverter(112.62)}`,
  width: `${utils.remConverter(112.11)}`,
});
