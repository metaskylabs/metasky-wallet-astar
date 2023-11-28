import { colors, typography, utils } from '@styles/shared';
import { css } from '@emotion/react';
import Typography from '@styles/shared/typography';

export const rechargeHeader = css({
  margin: `0 ${utils.remConverter(16)}`,
});

export const rechargeImage = css({
  height: utils.remConverter(64),
  width: utils.remConverter(64),
  borderRadius: utils.remConverter(10),
  backgroundColor: colors.Grey_Border,
});

export const rechargeTitle = css({
  ...typography.T_16_Bold,
  color: colors.Primary_Blue,
});
export const linkBlue = css({
  ...typography.T_12_Semibold,
  color: colors.Primary_Blue,
  cursor: `pointer`,
});
export const infoIcon = css({
  padding: `${utils.remConverter(3)} ${utils.remConverter(6)}`,
});
export const formGroup = css({
  marginTop: `20px`,
  display: `flex`,
});
export const currency = css({
  flex: `0 0 94px`,
  width: `94px`,
  marginRight: `8px`,
  position: `relative`,
});
export const input = css({
  width: `100%`,
  height: `48px`,
  padding: `12px`,
  color: colors.Secondary_Black_Text,
  backgroundColor: colors.Primary_Bg_Grey,
  boxShadow: colors.Shadow_Input_Inner_Smooth,
  borderRadius: `10px`,
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

export const rechargeForm = css({
  padding: `20px 15px`,
});

export const formLabel = css({
  color: colors.Secondary_Black_Text,
  ...typography.T_14_Semibold,
});

export const formMinLabel = css({
  color: colors.Secondary_Black_Text,
  ...typography.T_12_Regular,
});

export const errorMessage = css({
  ...typography.T_12_Regular,
  color: colors.Tertiary_Red,
  marginTop: utils.remConverter(8),
  marginLeft: utils.remConverter(5),
});

export const button = css({
  background: colors.Primary_Yellow,
  boxShadow: colors.Shadow_Btn_P_Outer_Sharp,
  borderRadius: `50px`,
  padding: `12px`,
  width: `100%`,
  border: `0`,
  ...typography.T_20_Bold,
});

export const loader = css({
  width: utils.remConverter(25),
  marginLeft: utils.remConverter(10),
});

export const buttonContainer = css([
  {
    // position: `fixed`,
    display: `flex`,
    // bottom: 0,
    width: `var(--hocWidth)`,
    padding: utils.remConverter(16),
    color: colors.Secondary_Black_Text,
    zIndex: 9,
  },
]);

export const rechargeDesc = css({
  ...Typography.T_14_Regular,
  padding: `0 ${utils.remConverter(16)}`,
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
    16,
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

export const transactionDetialsRow = css({});

export const transactionDetailsAmountContainer = css({
  textAlign: `right`,
});

export const transactionDetailsInr = css({
  ...typography.T_14_Bold,
});

export const transactionDetailsChain = css({
  ...typography.T_12_Regular,
});

export const buttonArrowOpen = css({
  transform: `rotate(-180deg)`,
  transition: `0.2s ease-in-out all`,
});

export const buttonArrowIcon = css({
  width: utils.remConverter(24),
  height: utils.remConverter(24),
});
