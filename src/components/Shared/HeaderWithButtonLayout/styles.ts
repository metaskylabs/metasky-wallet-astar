import { css } from '@emotion/react';
import { utils } from '@styles/shared';

export const container = css({
  display: `flex`,
  flexDirection: `column`,
  height: `100%`,
});

export const headerContainer = css({
  flexShrink: 0,
  padding: `${utils.remConverter(20)} ${utils.remConverter(
    16,
  )} ${utils.remConverter(18)}`,
});

export const contentContainer = css({
  flexGrow: 1,
  overflowY: `auto`,
});

export const ctaContainer = css({
  flexShrink: 0,
});
