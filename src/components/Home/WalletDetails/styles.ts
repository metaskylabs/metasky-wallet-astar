import { colors, typography, utils } from '@/styles/shared';
import { css } from '@emotion/react';

export const mr = css({
  marginRight: `${utils.remConverter(12)}`,
});

export const wrapper = css({
  padding: utils.remConverter(16),
  display: `grid`,
  rowGap: utils.remConverter(16),
});

export const divider = css({
  margin: `${utils.remConverter(28)} 0`,
});

export const walletDescription = css({
  margin: `${utils.remConverter(20)} ${utils.remConverter(16)}`,
  color: colors.Secondary_Black_Text,
  ...typography.T_14_Regular,
});

export const headerContainerTitle = css({
  ...typography.T_20_Bold,
  color: colors.Secondary_Black_Text,
});

export const headerContainerSubTitle = css({
  ...typography.T_14_Semibold,
  color: colors.Primary_Blue,
  marginRight: `${utils.remConverter(10)}`,
  cursor: `pointer`,
});

export const sidebarProfileContainer = css({
  padding: `20px 16px 25px 16px`,
  marginBottom: `${utils.remConverter(20)}`,
  backgroundColor: colors.Secondary_White,
});

export const rightIcon = css({
  width: `${utils.remConverter(14)}`,
  height: `${utils.remConverter(14)}`,
});

export const sidebarBody = css({
  margin: `0 ${utils.remConverter(16)}`,
  display: `flex`,
});

export const wallet = css({
  ...typography.T_16_Semibold,
  color: colors.Secondary_Black_Text,
  marginBottom: utils.remConverter(12),
});

export const mb = css({
  marginBottom: utils.remConverter(20),
});

export const listView = css({
  margin: `0 ${utils.remConverter(16)}`,
  cursor: `pointer`,
});

export const listViewImgContainer = css({
  backgroundColor: colors.Secondary_White,
  boxShadow: colors.Shadow_Btn_S_Outer_Smooth,
  borderRadius: 50,
  marginRight: utils.remConverter(16),
  width: utils.remConverter(44),
  height: utils.remConverter(44),
});

export const listViewImg = css({
  padding: utils.remConverter(10),
});

export const listViewTitle = css({
  ...typography.T_16_Semibold,
  color: colors.Secondary_Black_Text,
});
export const logOutContainer = css({
  display: `flex`,
  margin: `${utils.remConverter(16)}`,
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
