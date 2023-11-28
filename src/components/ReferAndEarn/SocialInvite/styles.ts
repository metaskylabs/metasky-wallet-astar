import { css } from '@emotion/react';
import { colors, mixins, typography, utils } from '@styles/shared';

export const container = css([
  {
    background: colors.Primary_Bg_Grey,
    padding: utils.remConverter(16),
    boxShadow: colors.Shadow_Card_Outer_Smooth,
  },
  mixins.flexColumn,
  mixins.flexAlignCenter,
  utils.ml(16),
  utils.mr(16),
  utils.mb(40),
]);

export const title = css([
  typography.T_16_Semibold,
  {
    color: colors.Secondary_Black_Text,
  },
  utils.mb(24),
]);

export const copy = css([
  typography.T_16_Semibold,
  {
    color: colors.Secondary_Black_Text,
  },
  utils.mb(24),
]);

export const socialIcons = css({
  display: `flex`,
  columnGap: utils.remConverter(26),
  rowGap: utils.remConverter(26),
});

export const hr = css({
  height: `1px`,
  background: colors.Grey_Border,
  width: `100%`,
  textAlign: `center`,
  margin: `${utils.remConverter(15)} 0 ${utils.remConverter(30)}`,
  zIndex: 1,
  position: `relative`,
});

export const orText = css({
  ...typography.T_16_Regular,
  background: colors.Primary_Bg_Grey,
  padding: `0 ${utils.remConverter(16)}`,
  display: `inline-block`,
  transform: `translateY(-14px)`,
  color: colors.Grey_Text,
});
