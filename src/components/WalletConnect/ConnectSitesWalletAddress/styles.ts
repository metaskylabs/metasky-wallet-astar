import { css } from '@emotion/react';
import { colors, typography, utils } from '@styles/shared';

export const container = css({
  color: colors.Secondary_Black_Text,
  background: colors.Secondary_White,
  borderRadius: 4,
  padding: utils.remConverter(16),
  marginBottom: utils.remConverter(16),
});
export const label = css({
  ...typography.T_14_Bold,
  marginBottom: utils.remConverter(16),
});
export const siteContainer = css({
  display: `flex`,
  flexDirection: `row`,
  justifyContent: `space-between`,
  alignItems: `center`,
});
export const siteList = css({
  display: `flex`,
  flexDirection: `row`,
  alignItems: `center`,
});
export const logoImage = css({
  width: utils.remConverter(32),
  height: utils.remConverter(32),
  border: `6px solid ${colors.Grey_Border}`,
  borderRadius: `100%`,
  marginRight: utils.remConverter(4),
});
export const connector = css({
  width: utils.remConverter(10),
  height: `auto`,
});
export const connectorTwo = css({
  width: utils.remConverter(10),
  height: `auto`,
  marginRight: utils.remConverter(4),
});

export const disconnectButton = css({
  ...typography.T_14_Bold,
  color: colors.Primary_Blue,
  cursor: `pointer`,
});

export const url = css({
  overflow: `hidden`,
  textOverflow: `ellipsis`,
  ...typography.T_14_Regular,
});
