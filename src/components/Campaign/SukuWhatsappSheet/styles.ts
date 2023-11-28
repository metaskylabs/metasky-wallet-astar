import { css } from '@emotion/react';
import { colors, utils } from '@styles/shared';
import Typography from '@styles/shared/typography';

export const container = css({
  display: `flex`,
  flexDirection: `column`,
  justifyContent: `space-between`,
  alignItems: `center`,
  height: `100%`,
  padding: utils.remConverter(32),
});

export const image = css({
  height: 250,
  width: 250,
});

export const title = css({
  ...Typography.T_20_Bold,
});
