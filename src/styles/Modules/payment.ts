import { colors, typography, utils } from '../shared';
import { css } from '@emotion/react';

export const paymentContainer = css({});

export const mainContainer = css({
  height: `100vh`,
  width: `100%`,
});
export const sectionContainer = css({
  height: `calc(100vh - 80px)`,
  display: `flex`,
  justifyContent: `space-between`,
  flexDirection: `column`,
  padding: 0,
  margin: 0,
});

export const buttonContainer = css({
  padding: `${utils.remConverter(16)} ${utils.remConverter(26)}`,
});
export const button = css({
  width: `100%`,
  height: `54px`,
});

export const priceContainer = css({
  boxShadow: `inset -5px -5px 10px #FAFBFF, inset 5px 5px 10px #A6ABBD`,
  margin: ` 0 ${utils.remConverter(16)} ${utils.remConverter(
    20,
  )} ${utils.remConverter(16)}`,
  borderRadius: utils.remConverter(10),
  padding: utils.remConverter(12),
});

export const priceText = css({
  ...typography.T_16_Regular,
  marginBottom: `0`,
});

export const walletContainer = css({
  background: colors.Secondary_White,
  width: `100%`,
  padding: `${utils.remConverter(20)} ${utils.remConverter(16)}`,
  marginBottom: utils.remConverter(12),
});

export const walletIcon = css({
  marginRight: utils.remConverter(4),
});
export const titleContainer = css({
  display: `flex`,
  alignItems: `center`,
});

export const title = css({
  ...typography.T_16_Regular,
  color: colors.Grey_Text,
  marginBottom: 0,
});

export const paymentMethodTitle = css({
  ...typography.T_14_Regular,
  marginLeft: utils.remConverter(10),
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

export const metaMaskDescription = css({
  ...typography.T_14_Regular,
  color: colors.Grey_Text,
  marginLeft: utils.remConverter(10),
});
export const metaMaskDescriptionHidden = css({
  display: `none`,
});

export const debitDescription = css({
  ...typography.T_12_Regular,
  color: colors.Grey_Text,
  margin: `${utils.remConverter(4)} 0 ${utils.remConverter(10)} 0`,
  marginLeft: utils.remConverter(10),
});

export const cardIconContainer = css({
  display: `flex`,
  marginLeft: utils.remConverter(10),
});
export const cardIcon = css({
  background: `white`,
  padding: utils.remConverter(2),
  marginRight: utils.remConverter(8),
  borderRadius: utils.remConverter(2),
  marginBottom: utils.remConverter(32),
});

export const connectWalletContainer = css({
  display: `flex`,
  margin: `${utils.remConverter(20)} ${utils.remConverter(
    16,
  )} 0 ${utils.remConverter(16)}`,
});
export const connectWalletContainerHidden = css({
  display: `none`,
});

export const connectBtn = css({
  width: utils.remConverter(24),
  height: utils.remConverter(24),
  background: colors.Primary_Blue,
  borderRadius: 50,
  boxShadow: colors.Shadow_Btn_P_Outer_Sharp,
  display: `grid`,
  placeItems: `center`,
});

export const connectWalletTextEnable = css({
  marginLeft: utils.remConverter(16),
  ...typography.T_16_Bold,
  color: colors.Primary_Blue,
});

export const addUpiInfo = css({
  display: `flex`,
  marginLeft: utils.remConverter(20),
});

export const verifyButton = css({
  flex: 2,
  ...typography.T_12_Bold,
  borderRadius: utils.remConverter(10),
  height: utils.remConverter(45),
  marginTop: utils.remConverter(8),
});

export const upiInput = {
  flex: 6,
};

export const hidden = {
  display: `none`,
};
export const verifiedTextContainer = css({
  marginLeft: utils.remConverter(21),
  display: `flex`,
  alignItems: `flex-start`,
});
export const checkIcon = {
  marginRight: utils.remConverter(14),
};

export const verifiedText = css({
  ...typography.T_12_Regular,
  padding: `${utils.remConverter(2)} 0`,
  color: `#01AD6F`,
});

export const methodsContainer = css({
  display: `block`,
});

export const divider = css({
  margin: `${utils.remConverter(12)} ${utils.remConverter(
    0,
  )} ${utils.remConverter(20)} ${utils.remConverter(0)}`,
});

export const inputContainer = css({
  padding: 0,
  marginRight: utils.remConverter(8),
});

export const failedText = css({
  ...typography.T_12_Regular,
  padding: `${utils.remConverter(2)} 0`,
  color: `#D80E0E`,
});

export const loaderContentInfo = css({
  textAlign: `center`,
  color: colors.Grey_Text,
  margin: `0 ${utils.remConverter(16)} 0 ${utils.remConverter(16)}`,
});

export const successIcon = css({
  textAlign: `center`,
  width: utils.remConverter(164),
  height: utils.remConverter(164),
  margin: `${utils.remConverter(117)} auto ${utils.remConverter(46)} auto`,
});

export const successDescription = css({
  ...typography.T_16_Regular,
  color: colors.Grey_Text,
});

export const successInfo = css({
  marginBottom: utils.remConverter(100),
});
export const blueButton = css({
  color: colors.Primary_Blue,
  textDecoration: `none`,
});
