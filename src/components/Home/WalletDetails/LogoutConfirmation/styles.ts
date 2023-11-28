import { css } from '@emotion/react';
import { colors, mixins, typography, utils } from '@styles/shared';

export const ctaContainer = css({
  padding: `0 ${utils.remConverter(16)} ${utils.remConverter(32)}`,
});

export const wrapper = css({
  ...mixins.flexAlignCenterJustifiedBetween,
  ...mixins.flexColumn,
});

export const imgContainer = css({
  height: utils.remConverter(142),
  width: utils.remConverter(142),
  borderRadius: `100%`,
  backgroundColor: colors.Grey_Border,
  margin: `${utils.remConverter(77)} auto ${utils.remConverter(20)} auto`,
  padding: utils.remConverter(30),
});

export const imgSize = css({
  height: `${utils.remConverter(82)}`,
  width: `${utils.remConverter(81)}`,
});

export const title = css({
  ...typography.T_20_Bold,
  color: colors.Secondary_Black_Text,
  marginBottom: utils.remConverter(12),
  textAlign: `center`,
});

export const description = css({
  ...typography.T_16_Regular,
  color: colors.Secondary_Black_Text,
  marginBottom: utils.remConverter(36),
  padding: `0 ${utils.remConverter(32)}`,
  textAlign: `center`,
});
