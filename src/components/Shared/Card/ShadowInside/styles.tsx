import { css } from '@emotion/react';
import { colors, utils } from '@styles/shared';
import Typography from '@styles/shared/typography';

export const container = css({
  boxShadow: colors.Shadow_Info_Inner_Smooth,
  borderRadius: 4,
  backgroundColor: colors.Primary_Bg_Grey,
  padding: `0 ${utils.remConverter(12)}`,
  display: `flex`,
  justifyContent: `space-around`,
});

export const informationBox = css({
  display: `flex`,
  flexDirection: `column`,
  justifyContent: `center`,
  alignItems: `center`,
  margin: `${utils.remConverter(8)} 0`,
  flex: 1,
});

export const divider = css({
  borderRight: `1px solid ${colors.Grey_Border}`,
  opacity: 0.7,
});

export const data = css({
  ...Typography.T_20_Bold,
});

export const title = css({
  ...Typography.T_16_Regular,
});
