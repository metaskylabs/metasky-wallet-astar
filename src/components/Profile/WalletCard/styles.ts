import { colors, typography, utils } from '@styles/shared';
import { css } from '@emotion/react';

export const container = css({
  display: `grid`,
  gridTemplateColumns: `1fr 17fr`,
  background: colors.Primary_Bg_Grey,
  borderRadius: 4,
  boxShadow: colors.Shadow_Info_Inner_Smooth,
  margin: `${utils.remConverter(20)} ${utils.remConverter(
    16,
  )} 0 ${utils.remConverter(16)}`,
  padding: utils.remConverter(16),
});

export const iconBg = css({
  display: `grid`,
  placeItems: `center`,
  height: utils.remConverter(74),
  width: utils.remConverter(74),
  backgroundColor: colors.Primary_Bg_Grey,
  boxShadow: colors.Shadow_Circle_smooth,
  borderRadius: 50,
  flex: 5,
});

export const detailsContainer = css({
  marginLeft: utils.remConverter(16),
});

export const walletDetails = css({
  display: `flex`,
});

export const walletName = css({
  ...typography.T_16_Bold,
  flex: 3,
  marginTop: 10,
});

export const walletId = css({
  wordWrap: `break-word`,
  ...typography.T_14_Light,
  color: colors.Secondary_Black_Text,
  overflowWrap: `break-word`,
  wordBreak: `break-all`,
  maxWidth: `100%`,
  marginTop: 5,
});

export const disconnect = css({
  flex: 1,
  display: `flex`,
  justifyContent: `flex-end`,
  ...typography.T_12_Semibold,
  color: colors.Primary_Blue,
  cursor: `pointer`,
});
