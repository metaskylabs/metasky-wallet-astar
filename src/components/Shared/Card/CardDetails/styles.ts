import { colors, typography } from '@styles/shared';
import { css } from '@emotion/react';

export const card = css({
  position: `fixed`,
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1,
  display: `grid`,
  height: `100%`,
  gridTemplateRows: `auto 1fr`,
});
export const cardBody = css({
  padding: `40px 20px`,
  background: colors.Primary_Bg_Grey,
  ...typography.T_14_Regular,
});
export const imageExpand = css({
  '& span': {
    display: `block !important`,
    aspectRatio: `1`,
  },
});
