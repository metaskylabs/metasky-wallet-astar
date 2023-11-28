import { css } from '@emotion/react';
import { colors, typography, utils } from '@styles/shared';

export const container = css({
  position: `relative`,
});
export const cardCarousel = css({
  listStyle: `none`,
  padding: 0,
  display: `flex`,
  flexDirection: `column`,
  height: 200,
  margin: `0px auto`,
  alignItems: `center`,
  position: `relative`,
  marginTop: utils.remConverter(20),
});

export const cardMarginLastIndex = css({
  marginTop: utils.remConverter(100),
});

export const cardMarginIndex = css({
  marginTop: utils.remConverter(60),
});

export const card = css({
  width: `100%`,
  height: `auto`,
  transition: `all 0.65s ease-out`,
  opacity: 0,
  position: `absolute`,
  overflow: `hidden`,
  transform: `scale(0.9) translateY(-50px)`,
  '&:nth-child(3)': {
    bottom: `30px`,
    zIndex: 1,
    filter: `grayscale(1)`,
    opacity: 1,
    transform: `scale(0.9) translateY(-65px)`,
  },
});

export const active = css({
  opacity: 1,
  transform: `scale(0.9) translateY(0)`,
  zIndex: 3,
});

export const next = css({
  opacity: 1,
  zIndex: 2,
  filter: `grayscale(1)`,
  transitionDelay: `0.2s`,
  clipPath: `inset(0 0 45% 0)`,
});

export const prev = css({
  transform: `scale(1) translateY(50px)`,
  zIndex: 2,
  opacity: 0,
  visibility: `hidden`,
});

export const icon = css({
  width: utils.remConverter(12),
  height: utils.remConverter(12),
  marginRight: utils.remConverter(11),
});

export const iconButton = css({
  border: 0,
  boxShadow: colors.Shadow_Btn_P_Outer_Sharp,
  backgroundColor: colors.Primary_Blue,
  borderRadius: 50,
  ...typography.T_12_Semibold,
  color: colors.Secondary_White,
  padding: `${utils.remConverter(6)} ${utils.remConverter(12)}`,
  textTransform: `uppercase`,
});

export const nextIcon = css({
  marginRight: utils.remConverter(0),
  marginLeft: utils.remConverter(11),
});

export const mr = css({
  marginRight: utils.remConverter(8),
});

export const btnContainer = css({
  position: `absolute`,
  top: 0,
  right: 0,
  zIndex: 9,
  marginTop: `-4.5rem`,
  marginRight: `0.5rem`,
});
