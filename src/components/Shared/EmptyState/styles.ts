import { css } from '@emotion/react';
import { utc } from 'moment';
import { typography, utils } from '@styles/shared';

export const container = css({
  height: `100%`,
  display: `flex`,
  flexDirection: `column`,
  justifyContent: `center`,
  flexGrow: 1,
});

export const contentContainer = css({
  padding: `0 ${utils.remConverter(45)}`,
  textAlign: `center`,
});

export const title = css({
  ...typography.T_20_Bold,
  marginBottom: utils.remConverter(12),
});
export const subTitle = css({
  ...typography.T_16_Regular,
  marginBottom: utils.remConverter(24),
});
export const emptyImg = css({
  width: utils.remConverter(140),
  height: utils.remConverter(140),
  objectFit: `contain`,
  marginBottom: utils.remConverter(25),
});
