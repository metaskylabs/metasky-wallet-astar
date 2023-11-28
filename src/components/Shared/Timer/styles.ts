import { colors, typography, utils } from '@styles/shared';
import { css } from '@emotion/react';

export const countDownContainer = css({
  display: `flex`,
  alignItems: `center`,
  flexDirection: `row`,
});

export const timerContainer = css({
  ...typography.T_16_Regular,
  color: colors.Secondary_Black_Text,
  marginLeft: utils.remConverter(6.5),
});
