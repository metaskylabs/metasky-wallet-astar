import { css } from '@emotion/react';
import { colors, mixins, typography, utils } from '@styles/shared';

export const container = css({
  margin: `0 ${utils.remConverter(16)} ${utils.remConverter(16)}`,
});

export const amountButtonContainer = css({
  display: `flex`,
  gap: utils.remConverter(20),
  padding: `0 ${utils.remConverter(0)} ${utils.remConverter(28)}`,
  margin: `0 ${utils.remConverter(9)}`,
});

export const amountButton = css({
  ...typography.T_16_Regular,
  color: colors.Primary_Blue,
  padding: utils.remConverter(12),
  background: colors.Primary_Bg_Grey,
  boxShadow: colors.Shadow_Card_Outer_Sharp2,
  borderRadius: utils.remConverter(4),
});

export const titleSemiBold = css({
  ...typography.T_14_Semibold,
  color: colors.Secondary_Black_Text,
});

export const titleBold = css({
  ...typography.T_14_Bold,
  color: colors.Secondary_Black_Text,
});

export const infoRegular = css({
  ...typography.T_14_Regular,
  color: colors.Secondary_Black_Text,
});

export const info12Refular = css({
  ...typography.T_12_Regular,
  color: colors.Secondary_Black_Text,
});

export const title20Bold = css({
  ...typography.T_20_Bold,
  color: colors.Secondary_Black_Text,
});

export const containerBody = css({
  background: colors.Secondary_White,
  paddingBottom: utils.remConverter(12),
});

export const infoContainer = css({
  margin: `0 ${utils.remConverter(11)}`,
  background: colors.Primary_Bg_Grey,
  borderRadius: 4,
  padding: utils.remConverter(10),
});

export const swipeButtonContainer = css([
  {
    width: `100%`,
  },
  { ...mixins.flexAlignJustifiedCenter },
]);

export const titleSemiBoldstepTitleText = css({
  ...typography.T_14_Semibold,
  color: colors.Secondary_Black_Text,
});

export const stepDescription = css({
  ...typography.T_12_Regular,
  color: colors.Grey_Text,
});

export const stepsContainer = css({
  position: `relative`,
  marginRight: utils.remConverter(24),
  height: utils.remConverter(60),
  '::after': {
    content: `" "`,
    position: `absolute`,
    top: 0,
    bottom: 0,
    left: `50%`,
    borderLeft: `1px dotted ${colors.Tertiary_Blue}`,
    height: `100%`,
  },
});

export const steps = css({
  ...typography.T_16_Semibold,
  background: colors.Tertiary_Blue,
  color: colors.Secondary_White,
  padding: utils.remConverter(4),
  borderRadius: `100%`,
  width: utils.remConverter(16),
  height: utils.remConverter(16),
});

export const stepsIcon = css({
  zIndex: 2,
  position: `relative`,
  display: `flex`,
});

export const referContainer = css({
  ':last-child > div > article:first-child:after': {
    border: `none`,
  },
  ':last-child > div > article:first-child': {
    height: 0,
  },
});

export const successContainer = css({
  padding: `${(utils.remConverter(24), utils.remConverter(16))}`,
});
