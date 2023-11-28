import { css } from '@emotion/react';
import { typography, utils, colors } from '../shared';

export const errorIcon = css({
  textAlign: `center`,
  width: utils.remConverter(200),
  height: utils.remConverter(200),
  margin: `${utils.remConverter(150)} auto ${utils.remConverter(48)} auto`,
});

export const contentWrapper = css({
  padding: `0 10%`,
  textAlign: `center`,
  margin: `0 auto`,
});

export const contentTitle = css({
  ...typography.T_20_Bold,
  marginBottom: utils.remConverter(16),
  color: colors.Secondary_Black_Text,
});

export const contentDescription = css({
  ...typography.T_16_Regular,
  color: colors.Secondary_Black_Text,
});

export const contentInfo = css({
  marginBottom: utils.remConverter(100),
});

export const contentBox = css({
  display: `flex`,
  flexDirection: `column`,
});

export const button = css({
  color: colors.Primary_Blue,
  textDecoration: `none`,
});
