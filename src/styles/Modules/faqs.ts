import { css } from '@emotion/react';
import { colors, typography } from '@styles/shared';
import utils from '@styles/shared/utils';

export const optionContainer = css({
  marginTop: utils.remConverter(40),
});
export const helperContainer = css({
  marginTop: utils.remConverter(82),
  padding: `0 ${utils.remConverter(16)}`,
});
export const footerGreyText = css({
  ...typography.T_14_Light,
  color: colors.Secondary_Black_Text,
});
export const contactText = css({
  ...typography.T_14_Regular,
  color: colors.Primary_Blue,
  marginTop: utils.remConverter(-14),
});

//Modal Styles

export const container = css({
  margin: `0 ${utils.remConverter(16)}`,
  marginTop: utils.remConverter(46),
});
export const title = css({
  ...typography.T_16_Regular,
  color: colors.Secondary_Black_Text,
});
export const infoContainer = css({
  ...typography.T_12_Light,
  marginBottom: utils.remConverter(40),
});
export const greyText = css({
  color: colors.Secondary_Black_Text,
  marginBottom: `0`,
  marginTop: `1rem`,
});
export const blueText = css({
  color: colors.Primary_Blue,
  textDecoration: `none`,
  marginTop: `0`,
});
