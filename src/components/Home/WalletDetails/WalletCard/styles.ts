import { css } from '@emotion/react';
import { colors, typography, utils } from '@styles/shared';

export const container = css({
  padding: `${utils.remConverter(16)} ${utils.remConverter(12)}`,
  display: `flex`,
  boxShadow: colors.Shadow_Info_Inner_Sharp,
  background: colors.Primary_Bg_Grey,
  borderRadius: utils.remConverter(4),
  gap: utils.remConverter(12),
});

export const imgContainer = css({
  boxShadow: colors.Shadow_Input_Inner_Smooth,
  background: colors.Primary_Bg_Grey,
  padding: utils.remConverter(12),
  borderRadius: `100%`,
  width: utils.remConverter(72),
  minWidth: utils.remConverter(72),
  maxHeight: utils.remConverter(72),
});

export const walletDetailsContainer = css({
  width: `100%`,
  display: `flex`,
  flexDirection: `column`,
  gap: utils.remConverter(8),
});

export const walletDetails = css({
  paddingTop: `${utils.remConverter(5)} 0`,
  display: `flex`,
  justifyContent: `space-between`,
});

export const address = css({
  ...typography.T_14_Semibold,
  color: colors.Primary_Blue,
  cursor: `pointer`,
});

export const description = css({
  ...typography.T_12_Semibold,
});
