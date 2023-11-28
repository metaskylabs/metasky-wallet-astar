import { css } from '@emotion/react';
import { utils } from '@styles/shared';

export const propertiesBody = css({
  display: `grid`,
  gridTemplateColumns: `repeat(2, 1fr)`,
  gap: utils.remConverter(12),
});
