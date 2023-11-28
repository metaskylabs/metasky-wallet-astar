import { css } from '@emotion/react';
import { colors, typography } from '@styles/shared';

export const incDecButton = css({
  borderRadius: `0.5rem`,
  height: `2rem`,
  width: `2rem`,
  backgroundColor: colors.Primary_Blue,
  color: colors.Secondary_White,
  margin: `0rem 0.5rem`,
  cursor: `pointer`,
});

export const container = css({
  ...typography.T_16_Regular,
  display: `flex`,
  alignItems: `center`,
});
