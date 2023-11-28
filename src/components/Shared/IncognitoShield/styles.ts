import { colors, typography, utils } from '@styles/shared';
import { css } from '@emotion/react';

export const container = css({
  height: `100%`,
  display: `flex`,
  flexDirection: `column`,
  justifyContent: `space-between`,
});

export const box = css({
  position: `relative`,
  width: `100%`,
  '&:before': {
    content: `""`,
    display: `block`,
    paddingTop: `100%`,
    /* initial ratio of 1:1*/
  },
});

// https://codepen.io/ItScofield/pen/PNVZoQ
export const content = css({
  position: `absolute`,
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  lineHeight: `100%`,
  height: `100%`,
  textAlign: `center`,
  display: `flex`,
  alignItems: `center`,
  justifyContent: `center`,
  background: `linear-gradient(138.94deg, #FFE55B 15.01%, #FDD029 81.72%)`,
});

export const apology = css({
  ...typography.T_24_Bold,
  marginTop: utils.remConverter(40),
  textAlign: `center`,
});

export const redirection = css({
  ...typography.T_16_Regular,
  marginTop: utils.remConverter(17),
  textAlign: `center`,
});

export const query = css({
  ...typography.T_16_Semibold,
  marginBottom: utils.remConverter(32),
  textAlign: `center`,
  marginTop: `auto`,
});

export const support = css({
  color: colors.Primary_Blue,
  cursor: `pointer`,
});
