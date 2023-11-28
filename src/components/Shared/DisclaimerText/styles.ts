import { css } from '@emotion/react';
import { colors, typography, utils } from '@styles/shared';
import { lowerCase } from 'lodash';

export const disclaimerWrapper = css({
  backgroundColor: colors.Grey_Border,
  borderRadius: 4,
  padding: utils.remConverter(12),
});
export const disclaimerText = css({
  ...typography.T_14_Regular,
  color: colors.Secondary_Black_Text,
});
export const disclaimerNetwork = css({
  ...typography.T_14_Semibold,
  textTransform: `capitalize`,
});
export const defaultCard = css({
  maxHeight: utils.remConverter(87),
  backgroundColor: colors.Grey_Border,

  margin: 0,
  img: {
    display: `none`,
  },
  '&>div:first-of-type': {
    display: `none`,
  },
  span: {
    ...typography.T_14_Regular,
    color: colors.Secondary_Black_Text,
  },
});
