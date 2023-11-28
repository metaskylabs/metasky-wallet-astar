import { css } from '@emotion/react';
import { colors, typography, utils } from '../shared';

export const purchaseSuccessIcon = css({
  height: `100vh`,
});

export const successIcon = css({
  width: utils.remConverter(144),
  height: utils.remConverter(144),
  backgroundColor: colors.Grey_Border,
  borderRadius: `50%`,
  '& > span': {
    width: `${utils.remConverter(94)} !important`,
    height: `${utils.remConverter(93)} !important`,
  },
});

export const purchaseCongratulation = css({
  ...typography.T_20_Bold,
  color: colors.Secondary_Black_Text,
  marginTop: utils.remConverter(40),
  marginBottom: utils.remConverter(4),
});

export const purchaseDescription = css({
  ...typography.T_14_Regular,
  color: colors.Secondary_Black_Text,
});
