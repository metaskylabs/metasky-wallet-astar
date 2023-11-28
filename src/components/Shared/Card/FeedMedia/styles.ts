import { colors, typography, utils, mixins } from '@styles/shared';
import { css } from '@emotion/react';

export const layout = css({
  display: `none`,
  width: `100%`,
  height: `100%`,
  // maxHeight: `${utils.remConverter(435)}`,
  objectFit: `cover`,
});

export const container = css([
  {
    width: `100%`,
    height: `100%`,
  },
  mixins.flexAlignJustifiedCenter,
]);

export const loaderContainer = css([
  {
    position: `absolute`,
    width: `100%`,
    height: `100%`,
  },
  mixins.flexAlignJustifiedCenter,
]);
