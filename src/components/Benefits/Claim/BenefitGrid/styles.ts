import { css } from '@emotion/react';
import { utils } from '@styles/shared';

export const gridContainer = css({
  display: `flex`,
  flexWrap: `wrap`,
  gap: utils.remConverter(12),
});

export const gridItemContainer = css({
  width: `calc(50% - 6px)`,
  wordWrap: `break-word`,
  cursor: `pointer`,
});
