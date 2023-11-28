import { css } from '@emotion/react';
import { colors, typography } from '@styles/shared';

export const buttonLayout = css({
  ...typography.T_14_Semibold,
  color: colors.Primary_Blue,
  textTransform: `uppercase`,
  cursor: `pointer`,
});
