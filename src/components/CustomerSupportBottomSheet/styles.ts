import { css } from '@emotion/react';
import { typography, utils } from '@styles/shared';

export const supportContainer = css({
  ...typography.T_16_Bold,
  display: `flex`,
  flexDirection: `column`,
  paddingTop: utils.remConverter(72),
  alignItems: `center`,
  height: `100%`,
});
