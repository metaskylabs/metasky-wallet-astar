import { css } from '@emotion/react';
import { colors, typography, utils } from '@styles/shared';

export const collectionCard = css({
  padding: utils.remConverter(10),
  background: colors.Secondary_White,
  display: `flex`,
  alignItems: `flex-start`,
  gap: utils.remConverter(12),
  margin: `${utils.remConverter(16)} 0`,
  cursor: `pointer`,
});

export const collectionImg = css({
  width: utils.remConverter(48),
  height: utils.remConverter(48),
  borderRadius: `100%`,
});

export const collectionName = css({
  ...typography.T_16_Bold,
  color: colors.Primary_Blue,
  display: `flex`,
  alignItems: `center`,
  gap: 6,
});

export const collectionDescription = css({
  ...typography.T_14_Regular,
  color: colors.Secondary_Black_Text,
  overflow: `hidden`,
  display: `-webkit-box`,
  WebkitLineClamp: `3`,
  WebkitBoxOrient: `vertical`,
});
