import { css } from '@emotion/react';
import { colors, utils } from '@styles/shared';

export const container = css({
  color: colors.Secondary_White,
  background: colors.Gradient_Purple,
  padding: `${utils.remConverter(24)} ${utils.remConverter(16)}`,
});

export const tropyRightBurst = css({
  position: `absolute`,
  right: 0,
  top: 0,
  marginRight: utils.remConverter(10),
  marginTop: utils.remConverter(-6),
});

export const tropyLeftBurst = css({
  position: `absolute`,
  left: 0,
  bottom: 0,
  marginLeft: utils.remConverter(6),
  marginBottom: utils.remConverter(-4),
});
