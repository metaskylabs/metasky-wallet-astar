import { css } from '@emotion/react';
import { colors, typography, utils } from '@styles/shared';

export const connectedState = css({
  ...typography.T_14_Semibold,
  color: colors.Tertiary_Green,
  gap: utils.remConverter(4),
});

export const disconnectedState = css({
  ...typography.T_14_Semibold,
  color: colors.Tertiary_Red,
  gap: utils.remConverter(4),
});

export const stateIcon = css({
  width: utils.remConverter(12),
  height: utils.remConverter(12),
  marginRight: utils.remConverter(4),
  display: `flex`,
  alignItems: `center`,
});

export const outerDiv = css({
  border: `${utils.remConverter(1.25)} solid ${colors.Tertiary_Green}`,
  borderRadius: `100%`,
  width: 12,
  height: 12,
  position: `relative`,
});

export const innerDiv = css({
  borderRadius: `100%`,
  height: 6,
  width: 6,
  position: `absolute`,
  left: `50%`,
  top: `50%`,
  transform: `translate(-50%, -50%)`,
  backgroundColor: colors.Tertiary_Green,
});
