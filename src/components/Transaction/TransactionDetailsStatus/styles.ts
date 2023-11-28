import { css } from '@emotion/react';
import { colors, typography } from '@styles/shared';
import utils from '@styles/shared/utils';

export const transactionsDetailsFromWrapper = css({
  margin: `${utils.remConverter(16)} ${utils.remConverter(16)}`,
  padding: utils.remConverter(16),
  borderRadius: 10,
  backgroundColor: colors.Secondary_White,
});

export const transactionsDetailsFrom = css({
  ...typography.T_14_SemiBold,
  color: colors.Secondary_Black_Text,
});

export const transactionsDetailsProfileContainer = css({
  margin: `${utils.remConverter(14)} 0`,
});

export const transactionsDetailsProfileName = css({
  ...typography.T_16_Bold,
  color: colors.Secondary_Black_Text,
  marginBottom: utils.remConverter(4),
});

export const transactionsDetailsProfileNumber = css({
  ...typography.T_14_Regular,
  color: colors.Secondary_Black_Text,
});

export const transactionsDetailsProfileInfoContainer = css({
  marginLeft: utils.remConverter(12),
});

export const transactionsDetailsInfoBirthday = css({
  padding: `${utils.remConverter(10)} ${utils.remConverter(12)}`,
  borderRadius: 10,
  backgroundColor: colors.Primary_Bg_Grey,
  boxShadow: colors.Shadow_Info_Inner_Smooth,
});

export const transactionsDetailsInfoBirthdayContent = css({
  ...typography.T_14_Regular,
  color: colors.Secondary_Black_Text,
});
