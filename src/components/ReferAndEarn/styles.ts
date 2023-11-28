import { css } from '@emotion/react';
import { colors, typography, utils } from '@styles/shared';

export const buttonContainer = css([
  {
    ...typography.T_16_Semibold,
    width: `var(--hocWidth)`,
    zIndex: 10,
    gap: 7,
    padding: `${utils.remConverter(8)} ${utils.remConverter(16)}`,
    boxShadow: colors.Shadow_Btn_Box,
    background: colors.Secondary_White,
  },
]);
