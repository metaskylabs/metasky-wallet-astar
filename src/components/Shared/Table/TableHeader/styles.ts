import { css } from '@emotion/react';
import { colors, utils } from '@styles/shared';

export const container = css({
  padding: `${utils.remConverter(10)} ${utils.remConverter(16)}`,
  backgroundColor: colors.Grey_Border,
  borderRadius: `4px 4px 0 0`,
  color: colors.Secondary_Black_Text,
});
