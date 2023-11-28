import { css } from '@emotion/react';
import { colors, typography, utils } from '@styles/shared';

export const buttonWrapper = css({
  display: `flex`,
  gap: utils.remConverter(14),
  padding: `0 ${utils.remConverter(16)} ${utils.remConverter(32)}`,
});

export const contentWrapper = css({
  display: `flex`,
  flexDirection: `column`,
});

export const imageContainer = css({
  margin: `0 auto`,
  maxHeight: utils.remConverter(142),
  maxWidth: utils.remConverter(142),
  background: colors.Grey_Border,
  borderRadius: `100%`,
  padding: utils.remConverter(30),
});

export const infoContainer = css({
  ...typography.T_16_Regular,
  textAlign: `center`,
  margin: `${utils.remConverter(24)} 0 ${utils.remConverter(36)}`,
});
