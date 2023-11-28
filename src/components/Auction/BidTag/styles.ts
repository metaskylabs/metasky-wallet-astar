import { css } from '@emotion/react';
import { colors, utils } from '@styles/shared';
import Typography from '@styles/shared/typography';

export const container = css({
  ...Typography.T_12_Regular,
  borderRadius: 4,
  display: `inline-block`,
  textAlign: `center`,
  minWidth: 90,
  padding: `${utils.remConverter(2)} ${utils.remConverter(14)}`,
});

export const topTag = {
  background: colors.Properties_Gradient_Border_2,
  color: colors.Secondary_White,
};

export const processingTag = {
  background: colors.Tertiary_Blue,
  color: colors.Secondary_White,
};

export const outTag = {
  background: colors.Grey_Border,
  color: colors.Secondary_Black_Text,
};
