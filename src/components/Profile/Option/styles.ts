import { colors, typography, utils } from '@styles/shared';
import { css } from '@emotion/react';

export const container = css({
  display: `flex`,
  alignItems: `center`,
  margin: `${utils.remConverter(24)} ${utils.remConverter(
    17,
  )} 0 ${utils.remConverter(16)}`,
  cursor: `pointer`,
});

export const textBold = css({
  flex: 4,
  ...typography.T_16_Bold,
  color: colors.Secondary_Black_Text,
});

export const textLight = css({
  flex: 9,
  ...typography.T_16_Regular,
  color: colors.Secondary_Black_Text,
});

export const icon = css({
  flex: 1,
  display: `flex`,
  justifyContent: `flex-end`,
});

export const offerText = css({
  ...typography.T_12_Semibold,
  background: colors.Primary_Blue,
  color: colors.Secondary_White,
  padding: `${utils.remConverter(4)} ${utils.remConverter(10)}`,
  marginLeft: utils.remConverter(8),
  borderRadius: 23,
});
