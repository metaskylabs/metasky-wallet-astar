import { css } from '@emotion/react';
import { colors, typography, utils } from '@styles/shared';

export const emptyNotificationDescription = css({
  ...typography.T_16_Semibold,
  marginTop: utils.remConverter(12),
  color: colors.Grey_Text,
  width: utils.remConverter(244),
  textAlign: `center`,
});
