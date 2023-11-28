import { css } from '@emotion/react';
import { colors, utils } from '@styles/shared';
import Typography from '@styles/shared/typography';

export const container = css({
  display: `flex`,
  flexDirection: `row`,
  alignItems: `center`,
});
export const boxWrapper = css({
  padding: `${utils.remConverter(7)} ${utils.remConverter(15)}`,
  textAlign: `center`,
  boxShadow: colors.Shadow_Input_Inner_Smooth,
});
export const hand = css({
  ...Typography.T_16_Bold,
});
export const handTitle = css({
  ...Typography.T_10_Regular,
});
export const divider = css({
  ...Typography.T_20_Bold,
  color: colors.Grey_Text,
  margin: `0 ${utils.remConverter(8)}`,
});
