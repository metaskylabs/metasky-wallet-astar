import { css } from '@emotion/react';
import { prepareDataForValidation } from 'formik';
import { colors, mixins, typography, utils } from '../shared';

export const profileContainer = css({
  background: colors.Primary_Bg_Grey,
});

export const detailsContainer = css({
  display: `flex`,
  marginTop: utils.remConverter(40),
  padding: ` 0 ${utils.remConverter(16)}`,
});

export const details = css({
  marginLeft: utils.remConverter(12),
  width: `70%`,
});

export const editIcon = css({
  display: `flex`,
  width: `30%`,
  justifyContent: `flex-end`,
  alignItems: `flex-start`,
});

export const detailsDark = css({
  ...typography.T_16_Bold,
  color: colors.Secondary_Black_Text,
  width: `100%`,
  wordBreak: `break-all`,
});
export const detailsLight = css({
  ...typography.T_14_Semibold,
  color: colors.Secondary_Black_Text,
  marginTop: utils.remConverter(4),
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

export const logoutBottomSheet = css({
  padding: `0px`,
});

export const loaderContentInfo = css({
  textAlign: `center`,
  color: colors.Secondary_Black_Text,
});

export const languageToggler = css([
  {
    ...typography.T_16_Bold,
    color: colors.Secondary_Black_Text,
    padding: `0 ${utils.remConverter(16)}`,
    gap: utils.remConverter(16),
  },
  mixins.flex,
]);

export const toggler = css([
  {
    height: utils.remConverter(25),
    width: utils.remConverter(40),
    background: colors.Grey_Border,
    borderRadius: utils.remConverter(18.5),
    padding: utils.remConverter(2),
    // transition: `flex 0.3s ease`,
  },
  mixins.flexAlignCenter,
]);

export const toggleButton = css({
  height: utils.remConverter(20),
  width: utils.remConverter(20),
  background: colors.Primary_Blue,
  borderRadius: `50%`,
  // transition: flex 0.3s ease,
  // boxShadow: colors.Shadow_Btn_S_Outer_Smooth,
});
