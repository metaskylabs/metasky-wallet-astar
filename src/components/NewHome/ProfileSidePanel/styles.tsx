import { css } from '@emotion/react';
import { colors, typography, utils } from '@styles/shared';

export const blurBg = css({
  position: `absolute`,
  right: 0,
  bottom: 0,
  top: 0,
  left: 0,
  zIndex: 9,
  background: `rgba(0, 0, 0, 0.6)`,
  backdropFilter: `blur(20px)`,
  cursor: `pointer`,
});
export const sideContainer = css({
  position: `absolute`,
  right: `-100%`,
  bottom: 0,
  top: 0,
  zIndex: 10,
  width: utils.remConverter(320),
  background: colors.Primary_Bg_Grey,
  transition: `all 0.2s ease-out`,
});

export const openSideContainer = css({
  right: 0,
});

export const profileContainer = css({
  background: colors.Primary_Bg_Grey,
});

export const detailsContainer = css({
  display: `flex`,
  marginTop: utils.remConverter(22),
  padding: ` 0 ${utils.remConverter(16)}`,
  alignItems: `center`,
});

export const details = css({
  marginLeft: utils.remConverter(12),
  width: `80%`,
});

export const editIcon = css({
  display: `flex`,
  width: `20%`,
  justifyContent: `flex-end`,
  alignItems: `flex-start`,
  alignSelf: `flex-start`,
});

export const detailsDark = css({
  ...typography.T_16_Bold,
  color: colors.Secondary_Black_Text,
  width: `100%`,
  wordBreak: `break-all`,
  textTransform: `capitalize`,
});
export const detailsLight = css({
  ...typography.T_14_Semibold,
  color: colors.Secondary_Black_Text,
  wordBreak: `break-all`,
});

export const walletTitle = css({
  ...typography.T_16_Bold,
  color: colors.Secondary_Black_Text,
  padding: ` 0 ${utils.remConverter(16)}`,
});

export const addWalletContainer = css({
  display: `flex`,
  margin: `${utils.remConverter(20)} ${utils.remConverter(
    16,
  )} 0 ${utils.remConverter(16)}`,
});

export const addBtnEnable = css({
  width: utils.remConverter(24),
  height: utils.remConverter(24),
  background: colors.Primary_Blue,
  borderRadius: 50,
  boxShadow: colors.Shadow_Btn_P_Outer_Sharp,
  display: `grid`,
  placeItems: `center`,
});

export const addBtnDisable = css({
  width: utils.remConverter(24),
  height: utils.remConverter(24),
  background: colors.Grey_Border,
  borderRadius: 50,
  boxShadow: colors.Shadow_Btn_P_Outer_Sharp,
  display: `grid`,
  placeItems: `center`,
});

export const addWalletTextEnable = css({
  marginLeft: utils.remConverter(16),
  ...typography.T_16_Bold,
  color: colors.Primary_Blue,
});
export const addWalletTextDisable = css({
  marginLeft: utils.remConverter(16),
  ...typography.T_16_Bold,
  color: colors.Grey_Border,
});

export const logOutContent = css({
  display: `flex`,
  margin: ` ${utils.remConverter(24)} ${utils.remConverter(
    16,
  )} ${utils.remConverter(32)} ${utils.remConverter(16)}`,
});

export const logOutContainer = css({
  position: `absolute`,
  bottom: 0,
  width: `100%`,
});
export const logOutText = css({
  ...typography.T_16_Bold,
  color: colors.Primary_Blue,
  marginLeft: utils.remConverter(11),
  background: `none`,
  border: `none`,
});

export const loaderContentInfo = css({
  textAlign: `center`,
  color: colors.Secondary_Black_Text,
});
