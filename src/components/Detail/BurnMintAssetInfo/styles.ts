import { colors, typography, utils } from '@styles/shared';
import { css } from '@emotion/react';

export const container = css({
  margin: `${utils.remConverter(15)} 0`,
  padding: `${utils.remConverter(16)} ${utils.remConverter(12)}`,
  background: colors.Secondary_White,
  borderRadius: 4,
});

export const item = css({
  ...typography.T_14_Regular,
  color: colors.Secondary_Black_Text,
  overflow: `hidden`,
  textOverflow: `ellipsis`,
});

export const name = css({
  display: `flex`,
  alignItems: `center`,
  justifyContent: `flex-start`,
});

export const title = css({
  ...typography.T_16_Bold,
  color: colors.Secondary_Black_Text,
  marginBottom: `${utils.remConverter(10)}`,
});
