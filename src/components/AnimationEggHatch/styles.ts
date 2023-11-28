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
  backgroundColor: `#fee892`,
});

export const animationContainer = css({
  width: `100%`,
  height: `100%`,
});
