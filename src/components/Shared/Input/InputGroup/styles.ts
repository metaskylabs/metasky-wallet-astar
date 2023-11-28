import { css } from '@emotion/react';
import { colors, typography, utils } from '@styles/shared';

export const inputGroupSuffex = css({
  ...typography.T_14_Semibold,
  color: colors.Secondary_Black_Text,
  position: `absolute`,
  right: 0,
  '&:before': {
    content: `""`,
    borderLeft: `1px solid ${colors.Grey_Text}`,
    height: utils.remConverter(43),
    display: `inline-block`,
    marginRight: utils.remConverter(8),
  },
});
