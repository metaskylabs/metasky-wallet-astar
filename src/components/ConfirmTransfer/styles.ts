import { colors, typography, utils } from '@styles/shared';
import { css } from '@emotion/react';
import Colors from '@styles/shared/colors';
import Typography from '@styles/shared/typography';

export const transferDetailsContainer = css({
  ...typography.T_16_Bold,
  display: `flex`,
  flexDirection: `column`,
  // margin: `${utils.remConverter(38)}`,
  padding: utils.remConverter(16),
  borderRadius: 4,
});

export const transferDetailsNft = css({
  borderRadius: 4,
  minHeight: utils.remConverter(96),
  display: `flex`,
  boxShadow: colors.Shadow_Card_Outer_Smooth,
});

export const transferDetailsReceiver = css({
  margin: `${utils.remConverter(29)} 0`,
  display: `flex`,
  gap: utils.remConverter(32),
});

export const transferDetailsHeader = css({
  marginBottom: utils.remConverter(21),
  display: `flex`,
  justifyContent: `space-between`,
});

export const transferDetailsFooter = css({
  ...typography.T_14_Semibold,
  overflow: `hidden`,
});

export const divider = css({
  border: `1px solid ${colors.Grey_Border}`,
  margin: `${utils.remConverter(24)} 0`,
});

export const transferFeesContainer = css({
  width: `100%`,
  background: colors.Secondary_White,
  display: `flex`,
  justifyContent: `space-between`,
  padding: `${utils.remConverter(20)} ${utils.remConverter(
    16,
  )} ${utils.remConverter(20)} ${utils.remConverter(16)}`,
  marginBottom: utils.remConverter(32),
});

export const transferFeesText = css({
  ...typography.T_16_Semibold,
  color: colors.Secondary_Black_Text,
});
export const inrText = css({
  ...typography.T_20_Bold,
  color: colors.Secondary_Black_Text,
  textAlign: `right`,
});

export const chainText = css({
  ...typography.T_12_Regular,
  color: colors.Secondary_Black_Text,
  textAlign: `right`,
});

export const infoIcon = css({
  padding: `${utils.remConverter(3)} ${utils.remConverter(6)}`,
});

export const paymentHeader = css({
  display: `flex`,
  justifyContent: `space-between`,
});

export const linkBlue = css({
  ...typography.T_12_Semibold,
  color: colors.Primary_Blue,
  cursor: `pointer`,
});

export const transferBtnWrapper = css({
  paddingBottom: utils.remConverter(24),
  position: `absolute`,
  width: `100%`,
});

export const transferBtn = css({
  width: `100%`,
});

export const loader = css({
  width: utils.remConverter(25),
  marginLeft: utils.remConverter(10),
});

export const walletIcon = css({
  height: utils.remConverter(24),
  filter: `brightness(0) invert(-2)`,
});

export const paymentMethodContainer = css({
  background: colors.Secondary_White,
  padding: `${utils.remConverter(16)} ${utils.remConverter(20)}`,
});

export const inputRadioContainer = css({
  ...typography.T_14_Regular,
  marginRight: utils.remConverter(40),
  paddingLeft: utils.remConverter(25),
  position: `relative`,
  display: `block`,
  color: colors.Secondary_Black_Text,
  '& > input': {
    position: `absolute`,
    opacity: 0,
  },
  '& > .checkmark': {
    position: `absolute`,
    top: 0,
    left: 0,
    height: utils.remConverter(20),
    width: utils.remConverter(20),
    backgroundColor: colors.Primary_Blue,
    border: `${utils.remConverter(1)} solid ${colors.Grey_Text}`,
    borderRadius: `50%`,
    boxShadow: colors.Shadow_Info_Inner_Smooth,
  },
  '& > input:checked ~ .checkmark:after': {
    display: `block`,
  },
  '& > .checkmark:after': {
    top: `4px`,
    left: `4px`,
    width: utils.remConverter(10),
    height: utils.remConverter(10),
    backgroundColor: colors.Primary_Blue,
    boxShadow: colors.Shadow_Btn_P_Outer_Sharp,
    borderRadius: `50%`,
  },
});
export const inputRadioContainerActive = css({
  ...typography.T_14_Regular,
  marginRight: utils.remConverter(40),
  paddingLeft: utils.remConverter(25),
  position: `relative`,
  display: `block`,
  color: colors.Secondary_Black_Text,
  '& > input': {
    position: `absolute`,
    opacity: 0,
  },
  '& > .checkmark': {
    position: `absolute`,
    top: 0,
    left: 0,
    height: utils.remConverter(20),
    width: utils.remConverter(20),
    backgroundColor: colors.Primary_Blue,
    border: `${utils.remConverter(1)} solid ${colors.Primary_Blue}`,
    borderRadius: `50%`,
    boxShadow: colors.Shadow_Info_Inner_Smooth,
  },
  '& > input:checked ~ .checkmark:after': {
    display: `block`,
  },
  '& > .checkmark:after': {
    top: `4px`,
    left: `4px`,
    width: utils.remConverter(10),
    height: utils.remConverter(10),
    backgroundColor: colors.Primary_Blue,
    boxShadow: colors.Shadow_Btn_P_Outer_Sharp,
    borderRadius: `50%`,
  },
});

export const title = css({
  ...typography.T_16_Bold,
  padding: ` 0 ${utils.remConverter(16)}`,
});

export const balanceContainer = css({
  ...typography.T_14_Regular,
  background: colors.Grey_Border,
});

export const balanceHeader = css({
  ...typography.T_14_Semibold,
  width: `100%`,
  padding: `${utils.remConverter(4)} ${utils.remConverter(16)}`,
  display: `flex`,
  justifyContent: `space-around`,
  textAlign: `center`,
});

export const balanceRow = css({
  gap: `1.5px`,
});

export const balanceCol = css({
  background: Colors.Secondary_White,
  width: `50%`,
  padding: `${utils.remConverter(12)} ${utils.remConverter(16)}`,
});

export const fullCol = css({
  background: Colors.Secondary_White,
  width: `100%`,
  padding: `${utils.remConverter(12)} ${utils.remConverter(16)}`,
});

export const inrBalance = css({});

export const balanceTitle = css({});

export const amount = css({
  ...typography.T_16_Bold,
  marginRight: utils.remConverter(5),
});

export const coinShortAmount = css({
  color: Colors.Tertiary_Red,
});

export const inputRadioBase = css({
  marginRight: utils.remConverter(8),
});

export const inputRadioLabel = css({
  '&:after': {
    content: `""`,
    position: `absolute`,
    display: `none`,
  },
});

export const rechargeDesc = css({
  ...Typography.T_14_Regular,
  padding: `0 ${utils.remConverter(16)}`,
  marginTop: utils.remConverter(20),
});

export const toastLink = css({
  border: 0,
  background: `none`,
  color: colors.Secondary_White,
  textDecoration: `underline`,
  padding: `0 ${utils.remConverter(5)}`,
});

export const successContainer = css({
  padding: `${(utils.remConverter(24), utils.remConverter(16))}`,
});

export const swipeButtonContainer = css({
  width: `var(--hocWidth)`,
  padding: utils.remConverter(16),
});

export const buyCryptoTitle = css({
  ...typography.T_16_Bold,
  color: colors.Primary_Blue,
  textDecoration: `none`,
});
