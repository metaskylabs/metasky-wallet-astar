import { css } from '@emotion/react';
import { colors, typography, utils } from '@styles/shared';

export const container = css({
  width: `100%`,
  position: `relative`,
});
export const primaryCard = css({
  display: `flex`,
  width: `100%`,
  alignItems: `center`,

  background: colors.Primary_Bg_Grey,
  boxShadow: colors.Shadow_Bg_Outer_Sharp,
  borderRadius: 4,
  overflow: `hidden`,
  position: `relative`,
  flexDirection: `row`,
  zIndex: 3,
  marginBottom: utils.remConverter(37),
});
export const collectionImage = css({
  width: utils.remConverter(115),
  height: `100%`,
  objectFit: `contain`,
});
export const content = css({
  padding: `${utils.remConverter(16)} ${utils.remConverter(12)}`,
  flexGrow: 1,
  overflow: `hidden`,
  color: colors.Secondary_Black_Text,
});

export const contentHeading = css({
  ...typography.T_16_Bold,
  margin: 0,
  marginBottom: utils.remConverter(8),
  whiteSpace: `nowrap`,
  overflow: `hidden`,
  textOverflow: `ellipsis`,
});
export const contentDesc = css({
  ...typography.T_12_Light,
  margin: 0,
  marginBottom: utils.remConverter(8),
  whiteSpace: `nowrap`,
  overflow: `hidden`,
  textOverflow: `ellipsis`,
});
export const infoTag = css({
  ...typography.T_12_Regular,
  padding: `${utils.remConverter(2)} ${utils.remConverter(12)}`,
  backgroundColor: colors.Primary_Yellow,
  borderRadius: 4,
  display: `inline-flex`,
  marginRight: utils.remConverter(2),
});
export const underlayCard = css({
  position: `absolute`,
  top: 0,
  right: 0,
  bottom: -10,
  left: 0,
  background: colors.Primary_Bg_Grey,
  transform: `scale(0.97)`,
  boxShadow: colors.Shadow_Card_Outer_Sharp2,
  borderRadius: 4,
  zIndex: 2,
});

export const secondaryUnderlay = css({
  bottom: -20,
  zIndex: 1,
  transform: `scale(0.95)`,
});
