import { css } from '@emotion/react';
import { colors, typography, utils } from '@styles/shared';

export const metaskyIconContainer = css({
  width: utils.remConverter(60),
  height: utils.remConverter(60),
  padding: utils.remConverter(10),
  backgroundColor: colors.Primary_Yellow,
  marginRight: utils.remConverter(10),
});

export const dividerLine = css({
  marginLeft: 0,
  marginRight: 0,
});

export const headerTitle = css({
  ...typography.T_20_Bold,
  color: colors.Secondary_Black_Text,
});

export const description = css({
  ...typography.T_16_Regular,
  color: colors.Secondary_Black_Text,
});

export const addToHomeDesc = css({
  ...typography.T_16_Semibold,
  color: colors.Secondary_Black_Text,
  marginLeft: utils.remConverter(6),
});
