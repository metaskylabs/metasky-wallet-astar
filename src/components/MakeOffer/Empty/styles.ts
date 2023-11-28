import { css } from '@emotion/react';
import { colors, typography } from '@styles/shared';
import utils from '@styles/shared/utils';

export const emptyOfferDescription = css({
  ...typography.T_16_Semibold,
  color: colors.Grey_Text,
  width: utils.remConverter(245),
  textAlign: `center`,
});
