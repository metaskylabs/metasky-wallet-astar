import { css } from '@emotion/react';
import { colors, typography } from '@styles/shared';
import utils from '@styles/shared/utils';

export const filterTransactionHeader = css({
  marginBottom: utils.remConverter(24),
});

export const filterTransactionTitle = css({
  ...typography.T_20_Bold,
  marginLeft: utils.remConverter(12),
});

export const filterTransactionWrapper = css({
  margin: `${utils.remConverter(40)} 0`,
});

export const filterTransactionSelectedButton = css({
  backgroundColor: colors.Primary_Bg_Grey,
  padding: utils.remConverter(13),
  margin: `${utils.remConverter(10)} 0`,
  borderRadius: 4,
  boxShadow: colors.Shadow_Card_Outer_Sharp2,
});

export const filterTransactionSelectedStateButton = css({
  border: `${utils.remConverter(1)} solid ${colors.Primary_Blue}`,
});

export const filterTransactionImageContainer = css({
  marginRight: utils.remConverter(29),
  padding: utils.remConverter(16),
  borderRadius: 50,
  backgroundColor: colors.Secondary_White,
  boxShadow: colors.Shadow_Input_Inner_Smooth,
});

export const filterTransactionNft = css({
  ...typography.T_16_Bold,
  color: colors.Secondary_Black_Text,
});

export const filterTransactionSelectedTitle = css({
  color: colors.Primary_Blue,
});

export const filterTransactionNftQty = css({
  ...typography.T_14_Regular,
  color: colors.Secondary_Black_Text,
});

export const filterApply = css({
  width: `100%`,
});
