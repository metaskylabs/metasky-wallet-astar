import { colors, typography, utils } from '@styles/shared';
import { css } from '@emotion/react';

export const incorrectPinContainter = css({
  textAlign: `center`,
  height: `100%`,
  display: `flex`,
  flexDirection: `column`,
  justifyContent: `center`,
});
export const detailsContainer = css({});
export const icon = css({
  display: `flex`,
  alignItems: `center`,
  justifyContent: `center`,
  width: utils.remConverter(142),
  height: utils.remConverter(142),
  margin: `0 auto`,
  background: colors.Grey_Border,
  borderRadius: `50%`,
});
export const img = css({
  width: utils.remConverter(81),
  height: utils.remConverter(82),
});
export const title = css({
  color: colors.Tertiary_Red,
  ...typography.T_20_Bold,
});

export const text = css({
  margin: `12px 12px`,
  textAlign: `center`,
  color: colors.Secondary_Black_Text,
  ...typography.T_16_Regular,
});

export const contactUs = css({
  margin: `20px 12px`,
  textAlign: `center`,
  color: colors.Primary_Blue,
  ...typography.T_16_Semibold,
  cursor: `pointer`,
});

export const footer = css({
  position: `absolute`,
  bottom: 0,
  textAlign: `center`,
  width: `100%`,
  margin: `${utils.remConverter(24)} 0`,
});

export const divider = css({
  width: `50%`,
});

export const orLine = css({
  ...typography.T_16_Regular,
  color: colors.Grey_Text,
});

export const loginOtherOptions = css({
  ...typography.T_16_Semibold,
  color: colors.Primary_Blue,
});
