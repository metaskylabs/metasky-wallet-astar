import { css } from '@emotion/react';
import { colors, typography, utils } from '@styles/shared';

export const instructionContainer = css({
  backgroundColor: colors.Secondary_White,
  borderRadius: utils.remConverter(4),
  padding: utils.remConverter(16),
});

export const instructionSectionTitle = css({
  ...typography.T_16_Bold,
  color: colors.Secondary_Black_Text,
  marginBottom: utils.remConverter(24),
});

export const instructionName = css({
  ...typography.T_14_Semibold,
  color: colors.Secondary_Black_Text,
});

export const instructionDescription = css({
  ...typography.T_12_Regular,
  color: colors.Secondary_Black_Text,
});

export const instructionStepContainer = css({
  position: `relative`,
});

export const instructionStep = css({
  position: `absolute`,
  height: `100%`,
  '::after': {
    content: `" "`,
    position: `absolute`,
    top: utils.remConverter(20),
    bottom: 0,
    left: utils.remConverter(10),
    borderLeft: `1px dashed ${colors.Tertiary_Blue}`,
    height: `calc(100% - ${utils.remConverter(20)})`,
    zIndex: 2,
  },
});

export const hideStepLine = css({
  '::after': {
    borderLeft: `1px dashed transparent`,
  },
});

export const instructionNumber = css({
  ...typography.T_12_Semibold,
  color: colors.Secondary_White,
  width: utils.remConverter(20),
  height: utils.remConverter(20),
  borderRadius: `50%`,
  backgroundColor: colors.Tertiary_Blue,
  display: `flex`,
  alignItems: `center`,
  justifyContent: `center`,
});
