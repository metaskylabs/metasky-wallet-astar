import { css } from '@emotion/react';
import utils from '@styles/shared/utils';
import { colors, typography } from '@styles/shared';

export const cardNFTImage = css({
  width: `100%`,
});

export const homeMB = css({
  marginBottom: utils.remConverter(40),
});

export const marketplaceMB = css({
  marginBottom: utils.remConverter(80),
});

export const nftCardWrapper = css({
  padding: `0 ${utils.remConverter(16)}`,
});

export const seeAll = css({
  ...typography.T_12_Semibold,
  color: colors.Primary_Blue,
  cursor: `pointer`,
});

export const swiperWrapper = css({
  '& > div': {
    padding: `${utils.remConverter(20)} ${utils.remConverter(
      16,
    )} ${utils.remConverter(38)} ${utils.remConverter(16)}`,
  },
  '.swiper-wrapper .swiper-slide:last-child': {
    marginRight: `${utils.remConverter(32)}`,
  },
});

export const shimmerContainer = css({
  marginTop: utils.remConverter(20),
  height: utils.remConverter(280),
  width: utils.remConverter(224),
  marginBottom: utils.remConverter(30),
  marginLeft: utils.remConverter(16),
  borderRadius: 10,
  overflow: `hidden`,
});

export const nftListingCardHeight = css({
  minHeight: utils.remConverter(282),
});
