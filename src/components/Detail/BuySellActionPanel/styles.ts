import { typography, utils } from '@styles/shared';
import { css } from '@emotion/react';

export const container = css({
  padding: `0 ${utils.remConverter(16)}`,
  alignItems: `center`,
  justifyContent: `center`,
  gap: utils.remConverter(16),
});

export const buttonContainer = css({
  width: `100%`,
});

export const primaryButton = css({
  width: `100% !important`,
  margin: 0,
  ...typography.T_16_Semibold,
});

export const secondaryButton = css({
  width: `100% !important`,
  height: utils.remConverter(50),
  margin: 0,
  ...typography.T_16_Semibold,
});
