import { css } from '@emotion/react';
import { colors, typography, utils } from '../shared';

export const container = css({
  padding: `${utils.remConverter(24)} ${utils.remConverter(16)}`,
});

export const headerContainer = css({
  position: `relative`,
});

export const imageContainer = css({
  overflow: `hidden`,
});

export const imageComp = css({
  display: `none`,
  width: `100%`,
  height: `auto`,
  maxHeight: `${utils.remConverter(435)}`,
  objectFit: `contain`,
  borderRadius: 4,
});
export const loader = css({
  width: utils.remConverter(40),
  margin: utils.remConverter(20),
});

export const toastLink = css({
  border: 0,
  background: `none`,
  color: colors.Secondary_White,
  textDecoration: `underline`,
  padding: `0 ${utils.remConverter(5)}`,
});

export const bodyContainerDescription = css({
  marginBottom: utils.remConverter(20),
  ...typography.T_16_Regular,
});

export const bodyContainerNfts = css({
  marginBottom: utils.remConverter(50),
  ...typography.T_16_Regular,
});

export const bodyContainerTokenTitle = css({
  ...typography.T_20_Bold,
  color: colors.Secondary_Black_Text,
  marginBottom: utils.remConverter(19),
  textAlign: `left`,
  marginTop: utils.remConverter(17),
});

export const divider = css({
  borderTop: `1px solid ${colors.Grey_Border}`,
  margin: `${utils.remConverter(40)} ${utils.remConverter(
    16,
  )} ${utils.remConverter(16)} ${utils.remConverter(16)}`,
});

export const bodyContainerDescriptionTitle = css({
  ...typography.T_16_Semibold,
  color: colors.Black,
  marginBottom: utils.remConverter(10),
});

export const bodyContainerTokenInfo = css({
  ...typography.T_16_Semibold,
  color: colors.Secondary_Black_Text,
});

export const bodyContainerDescriptionInfo = css({
  ...typography.T_14_Regular,
  color: colors.Secondary_Black_Text,
  '.ql-size-large': {
    ...typography.T_16_Regular,
  },
  '.ql-size-huge': {
    ...typography.T_20_Regular,
  },
  '.ql-size-small': {
    ...typography.T_12_Regular,
  },
  strong: {
    fontWeight: `bolder !important`,
  },
});

export const shareNftWrapper = css({
  margin: `0 ${utils.remConverter(10)}`,
});

export const loaderContentInfo = css({
  textAlign: `center`,
  color: colors.Secondary_Black_Text,
});

export const emptyBenefitContainer = css({
  height: `100%`,
});

export const bottoSheet = css({
  padding: 0,
});

export const timerContainer = css({
  justifyContent: `space-around`,
  padding: `0 ${utils.remConverter(20)}`,
});

export const cta = css({
  marginBottom: utils.remConverter(30),
});

export const disabledButton = css({
  padding: `10px`,
  width: `100%`,
  display: `flex`,
  alignItems: `center`,
  justifyContent: `center`,
  border: `1px solid`,
  borderColor: colors.Grey_Border,
  borderRadius: `50px`,
  color: colors.Grey_Text,
  marginBottom: utils.remConverter(30),
});

export const bodyContainer = css({
  width: `100%`,
});

export const shareNftContainer = css([
  {
    width: `100%`,
    boxShadow: colors.Shadow_Btn_Box,
    backgroundColor: colors.Secondary_White,
    padding: `${utils.remConverter(15)}`,
    position: `sticky`,
    bottom: 0,
    zIndex: 10,
  },
]);

export const secretContainer = css({
  ...typography.T_16_Regular,
  padding: `0 ${utils.remConverter(16)}`,
});
