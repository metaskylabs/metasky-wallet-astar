import { css } from '@emotion/react';
import { colors, typography, utils } from '@styles/shared';

export const headerSwiper = css({
  '& > .swiper-wrapper > .swiper-slide-active': {
    transform: `scale(1.1)`,
  },
  '& > .swiper-wrapper': {
    overflowY: `hidden`,
  },
  '.swiper-wrapper .swiper-slide:last-child': {
    marginRight: `${utils.remConverter(16)}`,
  },
  '.swiper-wrapper .swiper-slide:first-child': {
    marginLeft: `${utils.remConverter(16)}`,
  },
  paddingBottom: utils.remConverter(16),
});

export const headerWrapper = css({
  padding: `0 ${utils.remConverter(16)}`,
  paddingTop: utils.remConverter(20),
});

export const removeMarginLeft = css({
  backgroundSize: `contain`,
  backgroundRepeat: `no-repeat`,
});

export const seeAll = css({
  ...typography.T_12_Semibold,
  color: colors.Primary_Blue,
  cursor: `pointer`,
});

export const benefitsCardWrapper = css({
  padding: `0 ${utils.remConverter(16)}`,
  paddingTop: utils.remConverter(20),
});

export const benefitsCardStyles = css({
  margin: `0.5rem 0`,
  marginLeft: utils.remConverter(25),
});

export const shimmerContainer = css({
  maxHeight: `${utils.remConverter(132)}`,
  // height: utils.remConverter(132),
  width: utils.remConverter(304),
  overflow: `hidden`,
  borderRadius: 10,
  margin: `${utils.remConverter(20)} ${utils.remConverter(16)}`,
  // boxShadow: colors.Shadow_Card_Outer_Sharp2,
});
