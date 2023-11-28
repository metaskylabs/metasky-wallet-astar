import { colors, typography, utils } from '@styles/shared';
import { css } from '@emotion/react';

export const iconContainer = css({
  textAlign: `center`,
  width: utils.remConverter(220),
  height: utils.remConverter(220),
  margin: `${utils.remConverter(72)} auto ${utils.remConverter(24)} auto`,
  backgroundColor: colors.Grey_Border,
  borderRadius: `100%`,
});

export const commingSoonIcon = css({
  width: utils.remConverter(178),
  height: utils.remConverter(178),
});

export const successContentWrapper = css({
  textAlign: `center`,
  margin: `0 auto`,
});

export const successTitle = css({
  ...typography.T_20_Bold,
  marginBottom: utils.remConverter(8),
  color: colors.Secondary_Black_Text,
});

export const successDescription = css({
  ...typography.T_16_Regular,
  color: colors.Secondary_Black_Text,
  padding: `0 ${utils.remConverter(28)}`,
});

export const buttonContainer = css({
  width: `100%`,
  background: `#F0F0F3`,
  borderTop: `1px solid ${colors.Grey_Border}`,
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
