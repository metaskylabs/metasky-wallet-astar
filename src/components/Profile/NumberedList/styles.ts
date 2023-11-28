import { css } from '@emotion/react';
import { colors, typography } from '@styles/shared';
import utils from '@styles/shared/utils';

export const container = css({
  display: `flex`,
  marginBottom: utils.remConverter(23),
});

export const id = css({
  flex: 2,
  ...typography.T_12_Light,
  background: colors.Grey_Border,
  padding: utils.remConverter(3),
  borderRadius: `50%`,
  width: utils.remConverter(24),
  height: utils.remConverter(24),
  textAlign: `center`,
});

export const instruction = css({
  ...typography.T_14_Light,
  color: colors.Secondary_Black_Text,
  flex: 5,
  marginLeft: utils.remConverter(16),
});
