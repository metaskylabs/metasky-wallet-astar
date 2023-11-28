import { colors, typography, utils } from '@styles/shared';
import { css } from '@emotion/react';

export const whitelistContainer = css({
  width: `100%`,
  height: `100%`,
});

export const checkAnimation = css({
  margin: `0 auto 5% auto`,
  width: utils.remConverter(134),
  height: utils.remConverter(134),
  zIndex: 1,
  position: `relative`,
});

export const whitelistAnimation = css({
  position: `fixed`,
  top: 0,
  left: 0,
  width: `100vw`,
  height: `100vh`,
  transform: `translateY(-140px) translateX(-10px)`,
  zIndex: -1,
  pointerEvents: `none`,
});

export const whitelistText = css({
  ...typography.T_28_Bold,
  color: colors.Secondary_Black_Text,
  marginBottom: utils.remConverter(15),
});

export const whitelistDescription = css({
  ...typography.T_20_Regular,
  color: colors.Secondary_Black_Text,
  marginBottom: utils.remConverter(16),
});

export const divider = css({
  width: `100%`,
  margin: `${utils.remConverter(20)} 0`,
});

export const walletStatusContainer = css({
  marginBottom: utils.remConverter(7),
});

export const walletStatusSection = css({
  borderRadius: 4,
  backgroundColor: colors.Tertiary_Toast_Green,
  width: `100%`,
  height: utils.remConverter(32),
  padding: utils.remConverter(8),
  justifyContent: `space-between`,
});

export const statusConnected = css({
  width: utils.remConverter(8),
  height: utils.remConverter(8),
  backgroundColor: colors.Secondary_White,
  borderRadius: 100,
  marginRight: utils.remConverter(10),
});

export const walletStatus = css({
  ...typography.T_12_Semibold,
  color: colors.Secondary_White,
  textTransform: `capitalize`,
  margin: `2px 0px`,
});

export const walletContainer = css({
  backgroudColor: colors.Primary_Bg_Grey,
  boxShadow: colors.Shadow_Card_Outer_Sharp2,
  borderRadius: 8,
  padding: utils.remConverter(16),
});

export const walletIcon = css({
  width: utils.remConverter(40),
  height: utils.remConverter(40),
  marginRight: utils.remConverter(8),
});

export const walletText = css({
  ...typography.T_16_Bold,
  color: colors.Secondary_Black_Text,
});

export const walletAddress = css({
  ...typography.T_14_Semibold,
  color: colors.Secondary_Black_Text,
  textAlign: `right`,
});

export const walletAddressText = css({
  ...typography.T_12_Semibold,
  color: colors.Grey_Text,
  textAlign: `right`,
});

export const leftContent = css({
  display: `flex`,
  alignItems: `center`,
});

export const buttonContainer = css([
  {
    position: `fixed`,
    display: `flex`,
    bottom: 0,
    width: `var(--hocWidth)`,
    padding: utils.remConverter(16),
    background: colors.Secondary_White,
    color: colors.Secondary_Black_Text,
    borderTop: `1px solid ${colors.Grey_Border}`,
    zIndex: 9,
  },
]);

export const button = css({
  width: `100%`,
});
