import { css } from '@emotion/react';
import { colors, typography, utils } from '../shared';

export const imgContainer = {
  display: `flex`,
  justifyContent: `center`,
  marginTop: utils.remConverter(46),
};

export const img = css({
  height: utils.remConverter(358),
  width: utils.remConverter(358),
  display: `grid`,
  placeItems: `center`,
  background: colors.Secondary_White,
  borderRadius: utils.remConverter(10),
});

export const container = css({
  display: `grid`,
  gridTemplateColumns: `1fr 17fr`,
  background: colors.Primary_Bg_Grey,
  borderRadius: 10,
  boxShadow: colors.Shadow_Card_Outer_Sharp2,
  margin: `${utils.remConverter(20)} ${utils.remConverter(
    16,
  )} 0 ${utils.remConverter(16)}`,
  padding: utils.remConverter(16),
});

export const iconBg = css({
  display: `grid`,
  placeItems: `center`,
  height: utils.remConverter(74),
  width: utils.remConverter(74),
  backgroundColor: colors.Primary_Bg_Grey,
  boxShadow: colors.Shadow_Circle_smooth,
  borderRadius: 50,
  flex: 5,
});

export const detailsContainer = css({
  marginLeft: utils.remConverter(16),
});

export const title = css({
  ...typography.T_16_Bold,
  color: colors.Secondary_Black_Text,
});

export const description = css({
  ...typography.T_14_Light,
  color: colors.Grey_Text,
  overflowWrap: `break-word`,
  maxWidth: `100%`,
  marginTop: 5,
});

export const hideInput = css({
  display: `none`,
});
