import { css } from '@emotion/react';
import { colors, utils } from '@styles/shared';

export const container = css({
  background: colors.Primary_Blue,
  boxShadow: colors.Shadow_Card_Outer_Sharp,
  marginBottom: utils.remConverter(12),
  padding: utils.remConverter(8),
  borderRadius: 4,
  display: `flex`,
});

export const content = css({
  display: `flex`,
  flexDirection: `column`,
  color: colors.Secondary_White,
  marginLeft: utils.remConverter(10),
});
