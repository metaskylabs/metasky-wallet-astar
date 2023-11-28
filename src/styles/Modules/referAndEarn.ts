import { css } from '@emotion/react';
import { colors, typography, utils } from '../shared';

export const nftHeader = css({
  padding: `${utils.remConverter(20)} ${utils.remConverter(16)}`,
});

export const nftTitle = css({
  width: `100%`,
  textAlign: `center`,
  ...typography.T_20_Bold,
});

export const referAndEarnImage = css({
  height: utils.remConverter(198),
  width: utils.remConverter(198),
  borderRadius: utils.remConverter(98),
  backgroundColor: colors.Grey_Border,
  margin: `${utils.remConverter(150)} auto ${utils.remConverter(20)} auto`,
  padding: `${utils.remConverter(37)} ${utils.remConverter(32)}`,
  '& > span': {
    width: `${utils.remConverter(133)} !important`,
    height: `${utils.remConverter(133)} !important`,
  },
});

export const referAndEarnInviteInfo = css({
  ...typography.T_14_Regular,
  color: colors.Secondary_Black_Text,
  margin: `0 ${utils.remConverter(16)} ${utils.remConverter(
    20,
  )} ${utils.remConverter(16)}`,
});

export const referAndEarnInviteInfoNumber = css({
  color: colors.Secondary_Black_Text,
});

export const referAndEarn = css({
  backgroundColor: colors.Primary_Bg_Grey,
  boxShadow: colors.Shadow_Card_Outer_Smooth,
  borderRadius: 10,
  padding: `${utils.remConverter(19)} ${utils.remConverter(16)}`,
  margin: `${utils.remConverter(50)} ${utils.remConverter(
    16,
  )} ${utils.remConverter(40)} ${utils.remConverter(16)}`,
  textAlign: `center`,
});

export const referAndEarnText = css({
  ...typography.T_16_Bold,
  color: colors.Secondary_Black_Text,
  marginBottom: utils.remConverter(0),
});

export const email = css({
  color: colors.Primary_Blue,
  textDecoration: `none`,
});

export const referAndEarnTokens = css({
  ...typography.T_14_Regular,
  color: colors.Secondary_Black_Text,
});

export const referAndEarnLinkContainer = css({
  width: `100%`,
  backgroundColor: colors.Primary_Bg_Grey,
  boxShadow: colors.Shadow_Info_Inner_Smooth,
  padding: utils.remConverter(16),
});

export const referAndEarnLink = css({
  ...typography.T_12_Light,
  color: colors.Secondary_Black_Text,
});

export const referAndEarnOtherLinks = css({
  margin: `0 auto ${utils.remConverter(40)} auto`,
});

export const referAndEarnSocialText = css({
  ...typography.T_16_Semibold,
  color: colors.Secondary_Black_Text,
});

export const referAndEarnSocial = css({
  marginTop: utils.remConverter(25),
  width: `80%`,
  display: `grid`,
  gridTemplateColumns: `repeat(3, 1fr)`,
  gridGap: utils.remConverter(30),
});
