import { css } from '@emotion/react';
import { colors, typography, utils } from '../shared';

export const editProfileContainer = css({
  background: colors.Primary_Bg_Grey,
});

export const whiteCard = css({
  background: colors.Secondary_White,
  borderRadius: 4,
  position: `relative`,
  margin: `${utils.remConverter(20)} ${utils.remConverter(
    16,
  )} 0 ${utils.remConverter(16)}`,
  display: `grid`,
  placeItems: `center`,
  padding: `${utils.remConverter(16)}`,
});
export const avatarOuterContainer = css({
  width: 90,
  height: 90,
  boxShadow: colors.Shadow_Card_Outer_Sharp_OLD,
  background: colors.Primary_Bg_Grey,
  borderRadius: 50,
  display: `grid`,
  placeItems: `center`,
});

export const avatarContainer = css({
  width: 90,
  height: 90,
  boxShadow: colors.Shadow_Info_Inner_Smooth,
  background: colors.Primary_Bg_Grey,
  borderRadius: 50,
  display: `grid`,
  placeItems: `center`,
});

export const avatarInnerContainer = css({
  width: 86,
  height: 86,
  boxShadow: colors.Shadow_Circle_Sharp,
  background: colors.Primary_Bg_Grey,
  borderRadius: 50,
  display: `grid`,
  placeItems: `center`,
});

export const contactInfo = css({
  ...typography.T_16_Bold,
  color: colors.Secondary_Black_Text,
  marginTop: `${utils.remConverter(40)}`,
  padding: `0 ${utils.remConverter(16)}`,
});

export const contactInfoDescription = css({
  ...typography.T_14_Light,
  color: colors.Secondary_Black_Text,
  marginTop: `${utils.remConverter(8)}`,
  marginBottom: `${utils.remConverter(24)}`,
  padding: `0 ${utils.remConverter(16)}`,
});

export const edit = css({
  position: `absolute`,
  top: utils.remConverter(16),
  right: utils.remConverter(16),
});
