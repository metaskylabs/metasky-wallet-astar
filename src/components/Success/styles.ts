import { colors, typography, utils } from '@styles/shared';
import { css } from '@emotion/react';

export const container = css({
  margin: `${utils.remConverter(117)} auto ${utils.remConverter(46)} auto`,
  display: `flex`,
  alignItems: `center`,
  justifyContent: `center`,
});
export const ellipse = css({
  background: colors.Grey_Border,
  width: utils.remConverter(164),
  height: utils.remConverter(164),
  borderRadius: `100%`,
  padding: utils.remConverter(34),
});
export const successIcon = css({
  textAlign: `center`,
  width: utils.remConverter(200),
  height: utils.remConverter(200),
});

export const successContentWrapper = css({
  padding: `0 10%`,
  textAlign: `center`,
  margin: `0 auto`,
});

export const successTitle = css({
  ...typography.T_24_Bold,
  marginBottom: utils.remConverter(16),
  color: colors.Black,
});

export const successDescription = css({
  ...typography.T_16_Regular,
  color: colors.Secondary_Black_Text,
});

export const successInfo = css({
  marginBottom: utils.remConverter(100),
});

export const primaryButton = css({
  width: `100%`,
});

export const ctaContainer = css({
  padding: `0 ${utils.remConverter(16)} ${utils.remConverter(32)}`,
});
