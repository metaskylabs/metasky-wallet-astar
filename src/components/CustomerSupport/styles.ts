import { css } from '@emotion/react';
import { typography, utils } from '@styles/shared';

export const supportContainer = css({
  ...typography.T_16_Bold,
  margin: utils.remConverter(16),
});
