import { css } from '@emotion/react';
import { typography, utils } from '@styles/shared';

export const container = css({
  marginBottom: utils.remConverter(24),
  display: `flex`,
  flexDirection: `row`,
  justifyContent: `space-between`,
  flexWrap: `wrap`,
  alignItems: `center`,
});

export const heading = css({
  ...typography.T_20_Bold,
});
