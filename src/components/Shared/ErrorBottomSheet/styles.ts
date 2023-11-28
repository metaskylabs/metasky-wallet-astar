import { colors, typography, utils } from '@/styles/shared';
import { css } from '@emotion/react';

export const container = css({
  padding: `${utils.remConverter(60)} ${utils.remConverter(
    16,
  )} ${utils.remConverter(40)} ${utils.remConverter(16)}`,
  display: `flex`,
  flexDirection: `column`,
  alignItems: `center`,
});

export const img = css({
  width: utils.remConverter(200),
  height: utils.remConverter(200),
  marginBottom: utils.remConverter(20),
});

export const title = css({
  ...typography.T_20_Bold,
  color: colors.Secondary_Black_Text,
  marginBottom: utils.remConverter(16),
  textAlign: `center`,
});

export const description = css({
  ...typography.T_16_Regular,
  color: colors.Secondary_Black_Text,
  textAlign: `center`,
});

export const actionButton = css({
  marginTop: 16,
});
