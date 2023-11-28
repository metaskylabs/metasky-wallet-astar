import { colors, typography, utils } from '@styles/shared';
import { css } from '@emotion/react';

export const benefitsFilter = css({
  backgroundColor: colors.Primary_Bg_Grey,
  boxShadow: colors.Shadow_Card_Outer_Smooth,
  borderRadius: 10,
  height: utils.remConverter(36),
});

export const benefitsFilterIcon = css({
  width: utils.remConverter(20),
  height: utils.remConverter(20),
  marginRight: utils.remConverter(8),
});

export const benefitsFilterTitle = css({
  ...typography.T_12_Semibold,
  color: colors.Secondary_Black_Text,
});

export const benefitsSelectedFilter = css({
  backgroundColor: colors.Primary_Blue,
});

export const benefitsSelectedFilterText = css({
  color: colors.Secondary_White,
});

export const benefitsIcon = css({
  width: `100%`,
  height: `100%`,
});
