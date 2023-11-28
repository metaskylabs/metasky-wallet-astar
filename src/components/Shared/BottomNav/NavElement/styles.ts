import { css } from '@emotion/react';
import { colors, typography, utils } from '@styles/shared';

export const elementContainer = css({
  display: `flex`,
  flexDirection: `column`,
  justifyContent: `center`,
  alignItems: `center`,
  gap: utils.remConverter(4),
  width: utils.remConverter(50),
  padding: `${utils.remConverter(16)} 0`,
  position: `relative`,
  cursor: `pointer`,
});

export const iconContainer = css({
  width: utils.remConverter(24),
  height: utils.remConverter(24),
});

export const img = css({
  width: `100%`,
  height: `100%`,
});

export const elementName = css({
  ...typography.T_12_Regular,
  color: colors.Grey_Text,
});

export const activeBar = css({
  height: utils.remConverter(4),
  width: `100%`,
  background: colors.Primary_Blue,
  position: `absolute`,
  top: 0,
  borderRadius: `0 0 ${utils.remConverter(4)} ${utils.remConverter(4)}`,
});

export const notification = css({
  width: utils.remConverter(8),
  height: utils.remConverter(8),
  background: colors.Primary_Blue,
  borderRadius: `100%`,
  position: `absolute`,
  top: utils.remConverter(13),
  left: utils.remConverter(37),
});
