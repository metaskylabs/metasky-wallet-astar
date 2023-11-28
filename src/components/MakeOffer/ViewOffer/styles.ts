import { css } from '@emotion/react';
import { colors, typography, utils } from '@styles/shared';

export const nftCardDetailsContainer = css({
  boxShadow: colors.Shadow_Card_Outer_Smooth,
  margin: `0 ${utils.remConverter(16)}`,
  borderRadius: 4,
});

export const rejectButton = css({
  textTransform: `uppercase`,

  margin: `${utils.remConverter(17)} ${utils.remConverter(16)}`,
});

export const acceptbutton = css({
  textTransform: `uppercase`,
  width: `50%`,
  margin: `${utils.remConverter(17)} ${utils.remConverter(
    16,
  )} ${utils.remConverter(17)} 0`,
});

export const rejectedOfferContainer = css({
  ...typography.T_16_Regular,
  color: colors.Secondary_White,
  textAlign: `center`,
  backgroundColor: colors.Tertiary_Blue,
  padding: `${utils.remConverter(22)} ${utils.remConverter(16)}`,
});

export const shimmerCard = css({
  padding: `0 ${utils.remConverter(16)}`,
  marginTop: utils.remConverter(40),
});
