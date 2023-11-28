import { css } from '@emotion/react';
import { utils } from '@styles/shared';

export const container = css({
  display: `flex`,
  flexDirection: `column`,
  height: `100%`,
  padding: `${utils.remConverter(25)} 0`,
});

export const topSectionWrapper = css({
  padding: `${utils.remConverter(16)} ${utils.remConverter(16)} 0`,
});

export const headerWrapper = css({
  marginBottom: utils.remConverter(30),
});

export const contentWrapper = css({
  padding: `0 ${utils.remConverter(16)} ${utils.remConverter(16)}`,
  display: `flex`,
  flexDirection: `column`,
  gap: utils.remConverter(16),
  flexGrow: 1,
});
