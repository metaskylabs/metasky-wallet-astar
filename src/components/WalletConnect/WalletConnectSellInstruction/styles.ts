import { css } from '@emotion/react';
import { typography, utils } from '@styles/shared';

export const container = css({
  height: 700,
  position: `relative`,
});

export const cta = css({
  width: `100%`,
});

export const innerWrapper = css({
  height: `100%`,
  display: `flex`,
  flexDirection: `column`,
  justifyContent: `center`,
  padding: `0 ${utils.remConverter(16)}`,
});

export const header = css({
  ...typography.T_20_Bold,
  textAlign: `center`,
  marginBottom: utils.remConverter(24),
});

export const gif = css({
  width: `100%`,
});

export const ctaContainer = css({
  padding: `0 ${utils.remConverter(16)} ${utils.remConverter(32)}`,
});
