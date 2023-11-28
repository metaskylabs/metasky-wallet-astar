import { colors, typography, utils, mixins } from '@/styles/shared';
import { css } from '@emotion/react';

export const infoTableContainer = css({
  background: colors.Secondary_White,
  borderRadius: `${utils.remConverter(4)}`,
  overflow: `hidden`,
});

export const header = css([
  { background: colors.Grey_Border, gap: utils.remConverter(15) },
  mixins.flexAlignCenter,
  utils.padding(16),
]);

export const icon = css({
  width: utils.remConverter(18),
  height: `auto`,
});

export const title = css({
  ...typography.T_16_Bold,
  lineHeight: utils.remConverter(24),
  color: colors.Secondary_Black_Text,
});

export const infoContainer = css([
  { gap: utils.remConverter(16.5) },
  mixins.flexColumn,
  utils.ptlbr(14, 16, 16, 16),
]);
