import { css } from '@emotion/react';
import { mixins, utils } from '@styles/shared';

export const container = css([
  {
    width: `100%`,
    height: `100%`,
  },
  mixins.flexAlignJustifiedCenter,
]);
export const layout = css({
  display: `none`,
  width: `100%`,
  height: `auto`,
  maxHeight: `${utils.remConverter(435)}`,
  objectFit: `contain`,
});
