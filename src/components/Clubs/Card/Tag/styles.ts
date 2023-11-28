import { css } from '@emotion/react';
import Typography from '@styles/shared/typography';
import { colors, utils } from '@styles/shared';

export const content = css({
  ...Typography.T_12_Semibold,
  background: colors.Primary_Blue,
  color: colors.Secondary_White,
  padding: `${utils.remConverter(4)} ${utils.remConverter(10)}`,
  borderRadius: 23,
  minWidth: utils.remConverter(59),
});
