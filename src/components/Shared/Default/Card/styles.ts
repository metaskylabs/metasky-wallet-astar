import { colors, typography, utils } from '@styles/shared';
import { css } from '@emotion/react';

export const defaultCard = css({
  background: colors.Secondary_White,
  borderRadius: 4,
  flexDirection: `column`,
  padding: `${utils.remConverter(24)}`,
  marginBottom: `${utils.remConverter(20)}`,
  margin: `0 ${utils.remConverter(16)}`,
  marginTop: `${utils.remConverter(20)}`,
  textAlign: `center`,
});

export const defaultCardButton = css({
  padding: `${utils.remConverter(8)} ${utils.remConverter(
    36,
  )} ${utils.remConverter(8)} ${utils.remConverter(36)}`,
});

export const defaultCardImage = css({
  padding: `${utils.remConverter(20)}`,
  marginBottom: `${utils.remConverter(15)}`,
  borderRadius: `50%`,
  backgroundColor: colors.Primary_Bg_Grey,
  height: utils.remConverter(142),
  width: utils.remConverter(142),
});

export const defaultCardTitle = css({
  ...typography.T_16_Semibold,
  color: colors.Grey_Text,
});

export const defaultImage = css({
  height: utils.remConverter(81),
  width: utils.remConverter(81),
});
