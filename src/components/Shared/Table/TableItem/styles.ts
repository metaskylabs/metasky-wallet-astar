import { css } from '@emotion/react';
import { colors, utils } from '@styles/shared';

export const container = css({
  padding: utils.remConverter(16),
  backgroundColor: colors.Secondary_White,
  color: colors.Secondary_Black_Text,
});

export const itemName = css({
  wordBreak: `break-all`,
  overflow: `hidden`,
  textOverflow: `ellipsis`,
  display: `-webkit-box`,
  WebkitLineClamp: `1`,
  WebkitBoxOrient: `vertical`,
});
