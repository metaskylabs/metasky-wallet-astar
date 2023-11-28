import { css } from '@emotion/react';
import { colors, typography } from '@styles/shared';
import utils from '@styles/shared/utils';

export const transactionsDetailsInfoTab = css({
  margin: `${utils.remConverter(40)} ${utils.remConverter(16)}`,
  borderRadius: 4,
  background: colors.Secondary_White,
});

export const transactionsDetailsInfoTabTitle = css({
  backgroundColor: colors.Grey_Border,
  padding: `${utils.remConverter(20)}`,
  borderRadius: `4px 4px 0 0`,
});

export const transactionsDetailsTabImage = css({
  marginRight: utils.remConverter(28),
});

export const transactionsDetailsInfoTitleContent = css({
  ...typography.T_16_Bold,
  color: colors.Secondary_Black_Text,
});

export const transactionsDetailsInfoTabContainer = css({
  padding: `${utils.remConverter(20)}`,
});

export const transactionsInfo = css({
  margin: `${utils.remConverter(2)} 0`,
});

export const transactionsDetailsInfoTabArea = css({
  ...typography.T_14_Regular,
  marginRight: utils.remConverter(40),
  color: colors.Secondary_Black_Text,
});

export const purchaseNFT = css({
  marginLeft: utils.remConverter(10),
  marginTop: utils.remConverter(8),
});

export const purchaseNFTInput = css({
  width: utils.remConverter(53),
  height: utils.remConverter(31),
  border: 0,
  borderRadius: 10,
  textAlign: `center`,
  backgroundColor: colors.Primary_Bg_Grey,
  boxShadow: colors.Shadow_Info_Inner_Smooth,
  '&:focus': {
    outline: `none`,
  },
});

export const purchaseNFTButton = css({
  margin: `0 ${utils.remConverter(4)}`,
  width: utils.remConverter(20),
  height: utils.remConverter(20),
  border: 0,
  borderRadius: 50,
  boxShadow: colors.Shadow_Btn_P_Outer_Smooth,
});

export const transactionsDetailsSecondaryTab = css({
  color: colors.Secondary_Black_Text,
});

export const transactionFeeDetailInfoLink = css({
  color: colors.Primary_Blue,
  fontWeight: 800,
  cursor: `pointer`,
});

export const transactionFee = css({
  maxWidth: utils.remConverter(120),
  textAlign: `right`,
  textOverflow: `ellipsis`,
  whiteSpace: `nowrap`,
  overflow: `hidden`,
});

export const transactionsDetailsInfoTabContent = css({
  ...typography.T_14_Regular,
  color: colors.Secondary_Black_Text,
});

export const transactionsDetailsInfoSecondaryTabContent = css({
  ...typography.T_12_Regular,
  color: colors.Secondary_Black_Text,
});

export const transactionsDetailsInfoLink = css({
  color: colors.Primary_Blue,
});

export const divider = css({
  border: `${utils.remConverter(1)} solid ${colors.Grey_Border}`,
});

export const transactionsSection = css({
  marginBottom: utils.remConverter(16),
  marginTop: utils.remConverter(16),
});
