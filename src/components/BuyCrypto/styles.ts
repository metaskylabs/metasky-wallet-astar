import { css } from '@emotion/react';
import { colors, typography, utils } from '@styles/shared';

export const container = css({
  padding: `0 ${utils.remConverter(16)} ${utils.remConverter(16)}`,
});

export const swiperContainer = css({
  padding: `${utils.remConverter(16)} ${utils.remConverter(
    16,
  )} ${utils.remConverter(32)}`,
});

export const rechargeHeader = css({
  margin: `0 ${utils.remConverter(16)}`,
});

export const rechargeTitle = css({
  ...typography.T_16_Bold,
  color: colors.Primary_Blue,
});

export const formLabel = css({
  color: colors.Secondary_Black_Text,
  ...typography.T_14_Semibold,
});

export const formMinLabel = css({
  color: colors.Secondary_Black_Text,
  ...typography.T_12_Regular,
});

export const formGroup = css({
  display: `flex`,
});
export const currency = css({
  flex: `0 0 94px`,
  width: `94px`,
  marginRight: 8,
  position: `relative`,
});
export const input = css({
  width: `100%`,
  height: `48px`,
  padding: `12px`,
  color: colors.Secondary_Black_Text,
  backgroundColor: colors.Primary_Bg_Grey,
  boxShadow: colors.Shadow_Input_Inner_Smooth,
  borderRadius: 10,
  border: `0`,
  WebkitAppearance: `none`,
  ...typography.T_16_Regular,
  '&: focus': {
    outline: `none`,
  },
  '&::placeholder': {
    color: colors.Grey_Text,
    textTransform: `none`,
  },
});

export const amount = css({
  flex: `1`,
});

export const amountButtonContainer = css({
  display: `flex`,
  gap: utils.remConverter(20),
  padding: `${utils.remConverter(28)} ${utils.remConverter(
    0,
  )} ${utils.remConverter(28)}`,
});

export const amountButton = css({
  ...typography.T_16_Regular,
  color: colors.Primary_Blue,
  padding: utils.remConverter(12),
  background: colors.Primary_Bg_Grey,
  boxShadow: colors.Shadow_Card_Outer_Sharp2,
  borderRadius: utils.remConverter(4),
});

export const transactionDetailsContainer = css({
  padding: `${utils.remConverter(20)} ${utils.remConverter(
    0,
  )} ${utils.remConverter(0)}`,
  borderRadius: `${utils.remConverter(4)} ${utils.remConverter(4)} 0 0`,
});

export const transactionDetailsHeader = css({
  ...typography.T_16_Bold,
  background: colors.Grey_Border,
  padding: `${utils.remConverter(23)} ${utils.remConverter(15)}`,
  borderRadius: `${utils.remConverter(4)} ${utils.remConverter(4)} 0 0`,
});

export const detailsIcon = css({});

export const transactionDetailsInfo = css({
  ...typography.T_14_Regular,
  background: colors.Secondary_White,
  padding: utils.remConverter(16),
  display: `flex`,
  flexDirection: `column`,
  gap: utils.remConverter(16),
});

export const transactionDetailsAmountContainer = css({
  textAlign: `right`,
});

export const transactionDetailsInr = css({
  ...typography.T_14_Bold,
});

export const transactionDetailsNear = css({
  ...typography.T_12_Regular,
});

export const selectWrapper = css({
  position: `relative`,
  width: `100%`,
});

export const selectedBlock = css({
  background: colors.Primary_Bg_Grey,
  boxShadow: colors.Shadow_Input_Inner_Smooth,
  padding: utils.remConverter(12),
  display: `flex`,
  flexDirection: `row`,
  justifyContent: `space-between`,
  alignItems: `center`,
  cursor: `pointer`,
});

export const selectedNetwork = css({
  display: `flex`,
  flexDirection: `row`,
  alignItems: `center`,
  ...typography.T_14_Regular,
  whiteSpace: `nowrap`,
  overflow: `hidden`,
  textOverflow: `ellipsis`,
});

export const dropDownArrow = css({
  transform: `rotate(90deg)`,
  transition: `all .4s ease-out`,
});

export const openDropDownArrow = css({
  transform: `rotate(-90deg)`,
});

export const currencySelectorContainer = css({
  display: `flex`,
  justifyContent: `space-between`,
  alignItems: `center`,
  padding: `${utils.remConverter(18)} 0`,
});
export const ddContainer = css({
  background: colors.Secondary_White,
  boxShadow: colors.Shadow_Outer_Dropdown,
  borderRadius: 4,
  position: `absolute`,
  right: 0,
  marginTop: utils.remConverter(8),
  width: `50%`,
});
export const ddListContainer = css({
  listStyle: `none`,
  padding: 0,
  maxHeight: 400,
  overflowY: `auto`,
});
export const ddListItem = css({
  margin: `0 ${utils.remConverter(16)}`,
  padding: `${utils.remConverter(16)} 0`,
  cursor: `pointer`,
  borderTop: `1px solid ${colors.Grey_Border}`,
  '&:first-child': {
    border: 0,
  },
});

export const successContainer = css({
  padding: `${(utils.remConverter(24), utils.remConverter(16))}`,
});

export const buttonLayout = css({
  width: `100%`,
});
