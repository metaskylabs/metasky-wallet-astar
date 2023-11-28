import { css } from '@emotion/react';
import utils from '@styles/shared/utils';
import { colors, typography } from '@styles/shared';

export const cardNFTImage = css({
  width: `100%`,
});

export const nftCardWrapper = css({
  padding: `0 ${utils.remConverter(16)}`,
  paddingTop: utils.remConverter(31),
});

export const seeAll = css({
  ...typography.T_12_Semibold,
  color: colors.Primary_Blue,
  cursor: `pointer`,
});

export const metamaskMB = css({
  marginBottom: `${utils.remConverter(20)}`,
});

export const shimmerContainer = css({
  marginTop: utils.remConverter(20),
  height: utils.remConverter(280),
  width: utils.remConverter(224),
  marginBottom: utils.remConverter(30),
  marginLeft: utils.remConverter(16),
  borderRadius: 4,
  overflow: `hidden`,
  // boxShadow: colors.Shadow_Card_Outer_Smooth,
  // padding: utils.remConverter(12),
});

export const swiperWrapper = css({
  '.swiper-wrapper': {
    boxSizing: `border-box`,
    padding: `${utils.remConverter(20)}`,
  },
});
