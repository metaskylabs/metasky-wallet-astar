import { css } from '@emotion/react';
import { colors, typography, utils } from '@styles/shared';

export const container = css({
  padding: `${utils.remConverter(14)} ${utils.remConverter(16)}`,
  background: colors.Secondary_White,
  borderRadius: 4,
});

export const titleText = css({
  ...typography.T_16_Semibold,
  color: colors.Secondary_Black_Text,
});

export const stepTitleText = css({
  ...typography.T_14_Semibold,
  color: colors.Secondary_Black_Text,
});

export const stepDescription = css({
  ...typography.T_12_Regular,
  color: colors.Grey_Text,
});

export const divider = css({
  margin: `${utils.remConverter(12)} 0`,
});

export const stepsContainer = css({
  position: `relative`,
  marginRight: utils.remConverter(24),
  height: utils.remConverter(80),
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
  padding: `${utils.remConverter(11)} ${utils.remConverter(14)}`,
  borderRadius: `100%`,
  width: utils.remConverter(40),
  height: utils.remConverter(40),
});

export const stepsIcon = css({
  zIndex: 2,
  position: `relative`,
  display: `flex`,
});

export const referContainer = css({
  ':last-child > article:first-child:after': {
    border: `none`,
  },
  ':last-child > article:first-child': {
    height: 0,
  },
});
