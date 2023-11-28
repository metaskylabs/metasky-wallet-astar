import { css } from '@emotion/react';
import { colors, typography } from '@styles/shared';
import utils from '@styles/shared/utils';

export const bannerContainer = css({
  margin: `${utils.remConverter(10)} ${utils.remConverter(16)}`,
});

export const bannerBox = css({
  padding: `${utils.remConverter(8)} ${utils.remConverter(10)}`,
  backgroundColor: colors.Primary_Blue,
  color: colors.Secondary_White,
  ...typography.T_14_Semibold,
  borderRadius: `${utils.remConverter(4)}`,
  cursor: `pointer`,
  img: {
    marginRight: utils.remConverter(8),
    filter: `brightness(1.8)`,
  },
});
