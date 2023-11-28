import { colors, typography, utils } from '@/styles/shared';
import { css } from '@emotion/react';

export const walletConnectedStatus = css({
  backgroundColor: colors.Primary_Bg_Grey,
  boxShadow: colors.Shadow_Info_Inner_Smooth,
  borderRadius: 4,
});

export const walletBarcode = css({
  padding: `16px 14px 14px 16px`,
});

export const walletIconContainer = css({
  borderRadius: 100,
  boxShadow: colors.Shadow_Input_Inner_Smooth,
  width: utils.remConverter(74),
  height: utils.remConverter(74),
  marginRight: utils.remConverter(12),
});

export const walletConnectedBody = css({
  margin: `0 ${utils.remConverter(16)} 0 ${utils.remConverter(16)}`,
  paddingBottom: utils.remConverter(8),
});

export const walletIcons = css({
  width: utils.remConverter(50),
  height: utils.remConverter(50),
  marginRight: utils.remConverter(12),
});

export const walletTitle = css({
  ...typography.T_16_Bold,
  color: colors.Secondary_Black_Text,
});

export const networkDropdown = css({
  width: `100%`,
});

export const networkSelect = css({
  width: `100%`,
  position: `relative`,
  marginBottom: utils.remConverter(12),
});

export const networkDropdownPopup = css({
  width: `100%`,
  top: `50px`,
});

export const dividerLine = css({
  marginRight: utils.remConverter(16),
  marginLeft: utils.remConverter(16),
});

export const switchAccountContainer = css({
  margin: `0 ${utils.remConverter(16)}`,
});

export const switchAccountText = css({
  color: colors.Secondary_Black_Text,
  ...typography.T_16_Bold,
});

export const walletConnect = css({
  width: utils.remConverter(16),
  height: utils.remConverter(16),
  backgroundColor: colors.Primary_Blue,
  borderRadius: 100,
  marginRight: utils.remConverter(8),
});

export const walletConnectText = css({
  ...typography.T_12_Semibold,
  color: colors.Primary_Blue,
  textTransform: `uppercase`,
  cursor: `pointer`,
});

export const switchAccountButtonContainer = css({
  width: `100%`,
  padding: `0 ${utils.remConverter(16)}`,
  paddingBottom: utils.remConverter(16),
});

export const switchAccount = css({
  margin: `0`,
  paddingBottom: utils.remConverter(20),
  color: colors.Primary_Blue,
  cursor: `pointer`,
  ...typography.T_14_Semibold,
});

export const switchAccountButton = css({
  margin: `0`,
  color: colors.Primary_Blue,
  cursor: `pointer`,
  ...typography.T_14_Semibold,
});

export const walletAddressContainer = css({
  backgroundColor: colors.Primary_Bg_Grey,
  boxShadow: colors.Shadow_Info_Inner_Smooth,
  borderRadius: 10,
  padding: `${utils.remConverter(14)} ${utils.remConverter(10)}`,
  marginBottom: utils.remConverter(12),
});

export const walletAddressFragment = css({
  margin: `0 ${utils.remConverter(16)}`,
  paddingBottom: utils.remConverter(2),
});

export const walletAddressTitle = css({
  color: colors.Secondary_Black_Text,
  ...typography.T_14_Bold,
  marginBottom: utils.remConverter(12),
});

export const walletAddressText = css({
  color: colors.Secondary_Black_Text,
  ...typography.T_14_Regular,
  width: `100%`,
  marginRight: utils.remConverter(10),
  overflow: `hidden`,
});

export const copyIcon = css({
  width: utils.remConverter(26),
  height: utils.remConverter(26),
  cursor: `pointer`,
});

export const walletStatusTitle = css({
  ...typography.T_14_Semibold,
  color: colors.Secondary_Black_Text,
  marginBottom: utils.remConverter(4),
});

export const walletConnectedContainer = css({
  marginBottom: utils.remConverter(26),
});

export const walletStatusContainer = css({
  padding: utils.remConverter(16),
});

export const walletStatusSection = css({
  borderRadius: 4,
  backgroundColor: colors.Tertiary_Toast_Green,
  width: `100%`,
  height: utils.remConverter(32),
  padding: utils.remConverter(8),
});

export const walletNotConnectedStatus = css({
  border: `1px solid ${colors.Secondary_Black_Text}`,
  borderRadius: 10,
  backgroundColor: colors.Secondary_White,
  width: utils.remConverter(128),
  height: utils.remConverter(22),
});

export const statusConnected = css({
  width: utils.remConverter(8),
  height: utils.remConverter(8),
  backgroundColor: colors.Secondary_White,
  borderRadius: 100,
  marginRight: utils.remConverter(10),
});

export const statusNotConnected = css({
  backgroundColor: colors.Secondary_Black_Text,
  width: utils.remConverter(8),
  height: utils.remConverter(8),
  borderRadius: 100,
  marginRight: utils.remConverter(10),
});

export const walletStatus = css({
  ...typography.T_12_Semibold,
  color: colors.Secondary_White,
  textTransform: `capitalize`,
  margin: `2px 0px`,
});

export const walletNotConnected = css({
  ...typography.T_10_Regular,
  color: colors.Secondary_Black_Text,
  textTransform: `uppercase`,
  margin: `2px 0px`,
});

export const walletImg = css({
  width: utils.remConverter(24),
  height: utils.remConverter(24),
});

export const walletBalance = css({
  padding: `0 20px 6px 20px`,
});

export const walletBalanceTitle = css({
  ...typography.T_12_Semibold,
  color: colors.Secondary_Black_Text,
});

export const balance = css({
  ...typography.T_20_Bold,
  color: colors.Secondary_Black_Text,
});

export const walletNetwork = css({
  backgroundColor: colors.Primary_Blue,
  boxShadow: colors.Shadow_Btn_S_Outer_Smooth,
  borderRadius: `0px 0px 10px 10px`,
  padding: `13px 20px 15px 20px`,
  cursor: `pointer`,
});

export const walletNetworkTitle = css({
  ...typography.T_14_Semibold,
  color: colors.Secondary_White,
  marginRight: utils.remConverter(10),
  whiteSpace: `nowrap`,
});

export const walletNetworkImg = css({
  width: utils.remConverter(12),
  height: utils.remConverter(12),
});

export const networkAddressContainer = css({
  backgroundColor: colors.Secondary_White,
  padding: `${utils.remConverter(12)} ${utils.remConverter(16)}`,
  borderRadius: utils.remConverter(4),
  marginBottom: utils.remConverter(16),
});

export const networkAddressLogo = css({
  width: utils.remConverter(20),
  height: utils.remConverter(20),
  marginRight: utils.remConverter(10),
});

export const networkName = css({
  ...typography.T_14_Bold,
});

export const networkAddressDivider = css({
  border: `1px solid ${colors.Grey_Border}`,
  marginTop: utils.remConverter(16),
  marginBottom: utils.remConverter(16),
});

export const networkAddress = css({
  ...typography.T_14_Regular,
  marginRight: utils.remConverter(12),
});

export const viewCodeButton = css({
  ...typography.T_14_Bold,
  color: colors.Primary_Blue,
  cursor: `pointer`,
});
