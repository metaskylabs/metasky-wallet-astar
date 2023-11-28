import { colors, utils } from '@styles/shared';
import { css } from '@emotion/react';

export const dividerLine = css({
  margin: `${utils.remConverter(24)} ${utils.remConverter(16)}`,
  background: colors.Grey_Border,
  height: `1px`,
});
