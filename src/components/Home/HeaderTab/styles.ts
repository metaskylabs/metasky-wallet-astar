import { css } from '@emotion/react';
import utils from '@styles/shared/utils';
import { colors, typography } from '@styles/shared';

export const header = css({
  padding: `${utils.remConverter(24)} ${utils.remConverter(13)}`,
  marginBottom: utils.remConverter(20),
});

export const headerContainerTitle = css({
  ...typography.T_16_Bold,
  color: colors.Secondary_Black_Text,
});

export const notSignedInWalletText = css({
  color: colors.Secondary_Black_Text,
  ...typography.T_14_Regular,
  cursor: `pointer`,
});

export const notSignedInWallet = css({
  ...typography.T_14_Semibold,
  color: colors.Primary_Blue,
});

export const loginSectionStatus = css({
  backgroundColor: colors.Primary_Bg_Grey,
  padding: `${utils.remConverter(8)} ${utils.remConverter(9.5)}`,
  boxShadow: colors.Shadow_Card_Outer_Smooth,
  justifyContent: `center`,
  borderRadius: 20,
  cursor: `pointer`,
  gap: utils.remConverter(5),
});

export const loginIcon = css({
  width: utils.remConverter(12),
  height: utils.remConverter(12),
});

export const infoIcon = css({
  width: utils.remConverter(23),
  height: utils.remConverter(23),
  cursor: `pointer`,
});

export const loginAddress = css({
  marginRight: utils.remConverter(14),
  color: colors.Secondary_Black_Text,
  ...typography.T_14_Semibold,
});

export const myWallet = css({
  ...typography.T_12_Semibold,
  color: colors.Secondary_Black_Text,
});

export const connectionIconContainer = css({});

export const connectionIcon = css({
  height: utils.remConverter(10),
  width: utils.remConverter(10),
  padding: utils.remConverter(2),
});

export const mr = css({
  marginRight: `${utils.remConverter(12)}`,
});

export const arrowContainer = css({
  height: utils.remConverter(14),
  width: utils.remConverter(14),
});
