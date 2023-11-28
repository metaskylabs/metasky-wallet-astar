import { colors, mixins, typography, utils } from '@/styles/shared';
import { css } from '@emotion/react';

export const tableRowContainer = css([
  {
    ...typography.T_14_Regular,
    color: colors.Secondary_Black_Text,
    lineHeight: utils.remConverter(21),
  },
  mixins.flexAlignCenterJustifiedBetween,
]);
