import { css } from '@emotion/react';
import { utils } from '@styles/shared';

export const shimmerCard = css({
  aspectRatio: `1/1`,
  maxHeight: `${utils.remConverter(435)}`,
  minHeight: 0,
  minWidth: `100%`,
  backgroundSize: `1200px 100%`,
});
