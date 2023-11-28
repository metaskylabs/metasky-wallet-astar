import { css } from '@emotion/react';
import utils from '../shared/utils';
import { typography } from '@styles/shared';

export const container = css({
  display: `flex`,
  justifyContent: `center`,
  alignItems: `center`,
  flexDirection: `column`,
  height: `70vh`,
});
export const imageContainer = css({
  width: `${utils.remConverter(240)}`,
  height: `${utils.remConverter(240)}`,
  marginBottom: `${utils.remConverter(12)}`,
});

export const status = css({
  ...typography.T_20_Bold,
  textAlign: `center`,
  marginBottom: `${utils.remConverter(12)}`,
});

export const description = css({
  ...typography.T_16_Regular,
  textAlign: `center`,
  padding: `0 ${utils.remConverter(16)}`,
});

export const button = css({
  width: `100%`,
});

export const buttonContainer = css({
  padding: `${utils.remConverter(16)}`,
});
