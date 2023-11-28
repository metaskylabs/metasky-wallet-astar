import { colors, typography, utils } from '@/styles/shared';
import { css } from '@emotion/react';

export const logoutImgContainer = css({
  height: utils.remConverter(142),
  width: utils.remConverter(142),
  borderRadius: utils.remConverter(98),
  backgroundColor: colors.Grey_Border,
  margin: `${utils.remConverter(77)} auto ${utils.remConverter(20)} auto`,
  padding: `${utils.remConverter(37)} ${utils.remConverter(32)}`,
});

export const logoutImg = css({
  width: `${utils.remConverter(133)}`,
  height: `${utils.remConverter(133)}`,
});

export const logoutTitle = css({
  ...typography.T_20_Bold,
  color: colors.Secondary_Black_Text,
  marginBottom: utils.remConverter(12),
  textAlign: `center`,
});

export const logoutContent = css({
  ...typography.T_16_Regular,
  color: colors.Secondary_Black_Text,
  marginBottom: utils.remConverter(36),
  width: utils.remConverter(303),
  textAlign: `center`,
});

export const buttonContainer = css({
  width: `100%`,
});

export const logoutButton = css({
  textTransform: `uppercase`,
  width: `50%`,
  margin: `${utils.remConverter(17)} ${utils.remConverter(
    16,
  )} ${utils.remConverter(17)} 0`,
});

export const cancelbutton = css({
  textTransform: `uppercase`,
  margin: `${utils.remConverter(17)} ${utils.remConverter(16)}`,
});

export const imgSize = css({
  height: `${utils.remConverter(125.62)}`,
  width: `${utils.remConverter(130.11)}`,
});
