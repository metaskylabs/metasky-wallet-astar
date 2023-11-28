import { colors, typography, utils } from '@styles/shared';
import { css } from '@emotion/react';

export const container = css({
  position: `relative`,
  boxShadow: colors.Shadow_Card_Outer_Smooth,
  backgroundColor: colors.Primary_Bg_Grey,
  borderRadius: 4,
  padding: `${utils.remConverter(12.5)} ${utils.remConverter(16)}`,
  cursor: `pointer`,
});

export const semibold_14 = css({
  ...typography.T_14_Semibold,
  color: colors.Secondary_Black_Text,
  wordBreak: `break-all`,
  overflow: `hidden`,
  textOverflow: `ellipsis`,
  display: `-webkit-box`,
  WebkitLineClamp: `1`,
  WebkitBoxOrient: `vertical`,
});

export const regular_12 = css({
  ...typography.T_12_Regular,
  color: colors.Secondary_Black_Text,
});

export const verticalDivider = css({
  border: `1px solid ${colors.Grey_Border}`,
  marginRight: utils.remConverter(12),
  height: utils.remConverter(40),
});

export const notificationUnRead = css({
  position: `absolute`,
  top: 0,
  right: 0,
  margin: utils.remConverter(8.5),
  width: utils.remConverter(8),
  height: utils.remConverter(8),
  borderRadius: `100%`,
  background: colors.Primary_Blue,
});
