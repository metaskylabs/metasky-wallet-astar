import { css } from '@emotion/react';
import { colors, typography, utils } from '@styles/shared';

export const info = css({
  background: colors.Grey_Border,
  borderRadius: 4,
  padding: utils.remConverter(8),
});
export const createOfferWrapper = css({
  height: `calc(100vh - ${utils.remConverter(270)})`,
  justifyContent: `space-between`,
});
export const buttonLayoutHeight = css({
  width: `100%`,
});

export const label = css({
  ...typography.T_14_Regular,
  color: colors.Secondary_Black_Text,
  marginBottom: utils.remConverter(28),
});

export const head = css({
  ...typography.T_14_Bold,
  color: colors.Secondary_Black_Text,
  marginBottom: utils.remConverter(7),
});
