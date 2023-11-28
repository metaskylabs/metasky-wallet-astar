import { css } from '@emotion/react';

export const gridContainer = css({
  display: `flex`,
  flexWrap: `wrap`,
  gap: `10px`,
});

export const gridItemContainer = css({
  width: `calc(50% - 5px)`,
  wordWrap: `break-word`,
  cursor: `pointer`,
});
