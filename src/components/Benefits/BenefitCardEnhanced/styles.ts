import { css } from '@emotion/react';
import { colors, typography, utils } from '@styles/shared';
import AssetsImg from '@public/images';

export const benefitContainer = css({
  boxShadow: colors.Shadow_Card_Outer_Sharp3,
  borderRadius: utils.remConverter(4),
});

export const benefitInfoContainer = css({
  display: `flex`,
  width: `100%`,
  backgroundColor: colors.Secondary_White,
  paddingRight: utils.remConverter(24),
  position: `relative`,
  cursor: `pointer`,
});

export const rightCut = css({
  position: `absolute`,
  right: utils.remConverter(-15),
  top: `calc(50% - ${utils.remConverter(15)})`,
  width: utils.remConverter(30),
  height: utils.remConverter(30),
  borderRadius: `50% 0 0 50%`,
  backgroundColor: colors.Primary_Bg_Grey,
  boxShadow: colors.Shadow_Input_Inner_Lighter,
});

export const leftCut = css({
  position: `absolute`,
  left: utils.remConverter(-15),
  top: `calc(50% - ${utils.remConverter(15)})`,
  width: utils.remConverter(30),
  height: utils.remConverter(30),
  borderRadius: `0 50% 50% 0`,
  backgroundColor: colors.Primary_Bg_Grey,
});

export const benefitImg = css({
  width: utils.remConverter(150),
  minWidth: utils.remConverter(150),
  height: utils.remConverter(150),
  marginRight: utils.remConverter(12),
});

export const benefitName = css({
  ...typography.T_16_Bold,
  color: colors.Secondary_Black_Text,
  marginBottom: utils.remConverter(8),
  marginTop: utils.remConverter(12),
});

export const benefitDescription = css({
  ...typography.T_12_Light,
  color: colors.Secondary_Black_Text,
  marginBottom: utils.remConverter(16),
  height: utils.remConverter(36),
  overflow: `hidden`,
  display: `-webkit-box`,
  WebkitLineClamp: `2`,
  WebkitBoxOrient: `vertical`,
  a: {
    wordBreak: `break-all`,
  },
});

export const benefitExpiry = css({
  ...typography.T_12_Semibold,
  color: colors.Secondary_Black_Text,
  display: `flex`,
  alignItems: `center`,
  gap: utils.remConverter(4),
});

export const benefitActionContainer = css({
  backgroundColor: colors.Primary_Bg_Grey,
  padding: utils.remConverter(16),
  display: `flex`,
  flexDirection: `column`,
  gap: utils.remConverter(20),
});

export const timerContainer = css({
  justifyContent: `space-between`,
});

export const actionButton = css({
  color: colors.Primary_Blue,
  cursor: `pointer`,
  ...typography.T_14_Semibold,
});

export const disabledActionButton = css({
  color: colors.Grey_Text,
  cursor: `pointer`,
  display: `flex`,
  alignItems: `center`,
  ...typography.T_14_Semibold,
});

export const secretContainer = css({
  ...typography.T_16_Regular,
  padding: `0 ${utils.remConverter(16)}`,
});

export const loaderContentInfo = css({
  textAlign: `center`,
  color: colors.Secondary_Black_Text,
});
