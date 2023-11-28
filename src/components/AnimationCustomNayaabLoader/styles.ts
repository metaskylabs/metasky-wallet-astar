import { css } from '@emotion/react';
import { colors, typography, utils } from '@styles/shared';

export const mainContainer = css({
  background: `#E6EAFD`, // TODO : comment added in figma to get name for styleguide color
  height: `100%`,
  overflow: `auto`,
  overflowX: `hidden`,
  display: `flex`,
  flexDirection: `column`,
  padding: `0 ${utils.remConverter(16)}`,
});
export const title = css({
  ...typography.T_28_Bold,
  marginTop: utils.remConverter(80),
  marginBottom: utils.remConverter(50),
  textAlign: `center`,
  color: colors.Secondary_Black_Text,
  position: `relative`,
  zIndex: 1,
});
export const slotContainer = css({
  position: `relative`,
  textAlign: `center`,
  width: 330,
  margin: `0 auto `,
  zIndex: 2,
  marginBottom: utils.remConverter(30),
  '&::before': {
    content: `" "`,
    width: 400,
    height: `100%`,
    position: `absolute`,
    left: 55,
    top: 165,
    background: `linear-gradient(160.84deg, #D2DAFF 33.16%, rgba(210, 218, 255, 0) 74.12%)`,
    zIndex: 0,
    transform: `rotate(-35deg)`,
  },
});
export const slotMask = css({
  position: `relative`,
  width: `100%`,
});

export const buttonContainer = css({
  marginTop: `auto`,
  width: `100%`,
  marginBottom: utils.remConverter(38),
  ...typography.T_16_Semibold,
  color: colors.Secondary_Black_Text,
  textAlign: `center`,
  position: `relative`,
  zIndex: 2,
});

export const confetti = css({
  position: `absolute`,
  top: 0,
  zIndex: 0,
  bottom: 0,
});

export const animationContainer = css({
  position: `absolute`,
  top: 155,
  left: `50%`,
  transform: `translateX(-50%)`,
  width: 235,
});

export const figCaption = css({
  ...typography.T_24_Bold,
  textAlign: `center`,
  marginBottom: utils.remConverter(13),
  position: `relative`,
  zIndex: 2,
});
export const buttonAddedStyle = css({
  margin: `0 auto`,
  position: `relative`,
  zIndex: 1,
  width: `100%`,
});
export const loader = css({
  width: utils.remConverter(25),
  marginLeft: utils.remConverter(10),
});
