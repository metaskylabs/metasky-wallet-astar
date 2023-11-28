import { css } from '@emotion/react';
import { utils } from '@styles/shared';

export const container = css({
  marginBottom: utils.remConverter(40),
});

export const divider = css({
  margin: `0 ${utils.remConverter(16)}`,
});

export const optionItem = css({
  '& > div:last-child > div': {
    height: 0,
    margin: 0,
  },
});

export const sortContainer = css({
  width: utils.remConverter(151),
  margin: `${utils.remConverter(36)} 0`,
});

export const tableContainer = css({
  maxHeight: utils.remConverter(269),
  overflowY: `scroll`,
});
