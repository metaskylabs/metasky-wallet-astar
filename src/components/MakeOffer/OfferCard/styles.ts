import { css } from '@emotion/react';
import { colors } from '@styles/shared';
import utils from '@styles/shared/utils';

export const container = css({
  backgroundColor: colors.Primary_Bg_Grey,
  boxShadow: colors.Shadow_Card_Outer_Smooth,
  borderRadius: 4,
});

export const imageContainer = css({
  width: utils.remConverter(96),
  height: utils.remConverter(90),
});

export const mediaSource = css({
  borderRadius: `4px 0 0 4px`,
  objectFit: `cover`,
  height: `100%`,
  width: `100%`,
});

export const collectionName = css({
  wordBreak: `break-all`,
  overflow: `hidden`,
  textOverflow: `ellipsis`,
  display: `-webkit-box`,
  WebkitLineClamp: `2`,
  WebkitBoxOrient: `vertical`,
});

export const offerPrice = css([
  {
    alignItems: `end`,
    width: `30%`,
  },
]);
