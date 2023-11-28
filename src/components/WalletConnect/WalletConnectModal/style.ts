import { css } from '@emotion/react';
import { typography, utils } from '@styles/shared';

export const container = css({
  height: `auto`,
  position: `relative`,
  padding: `0 ${utils.remConverter(16)}`,
});

export const header = css({
  ...typography.T_20_Bold,
  textAlign: `center`,
  marginBottom: utils.remConverter(24),
});

export const subTitle = css({
  ...typography.T_16_Regular,
  textAlign: `center`,
  marginBottom: utils.remConverter(40),
});
