import { colors, typography, utils } from '@styles/shared';
import { css } from '@emotion/react';

export const chipWrapper = css({
  width: utils.remConverter(208),
  height: utils.remConverter(52),
  borderRadius: utils.remConverter(30),
  backgroundColor: colors.Primary_Blue,
  boxShadow: colors.Shadow_Card_Outer_Sharp2,
  padding: `${utils.remConverter(15)} ${utils.remConverter(20)}`,
  whiteSpace: `nowrap`,
  margin: `${utils.remConverter(20)} ${utils.remConverter(
    16,
  )} ${utils.remConverter(16)} ${utils.remConverter(16)}`,
});

export const chipIcon = css({
  marginRight: utils.remConverter(10),
  '& > span': {
    width: `${utils.remConverter(24)} !important`,
    height: `${utils.remConverter(24)} !important`,
  },
});

export const chipText = css({
  ...typography.T_14_Regular,
  color: colors.Secondary_White,
});
