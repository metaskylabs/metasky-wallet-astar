import { css } from '@emotion/react';
import { colors, typography, utils } from '@styles/shared';

export const container = css({
  height: 700,
  position: `relative`,
});

export const cta = css({
  width: `100%`,
});
export const header = css({
  ...typography.T_20_Bold,
  textAlign: `center`,
  marginBottom: utils.remConverter(24),
});
export const title = css({
  ...typography.T_16_Bold,
  marginBottom: utils.remConverter(16),
});

export const card = css({
  background: colors.Secondary_White,
  boxShadow: colors.Shadow_Outer_Dropdown,
  borderRadius: 4,
  padding: utils.remConverter(16),
  marginBottom: utils.remConverter(32),
});
export const label = css({
  ...typography.T_14_Regular,
  marginBottom: utils.remConverter(4),
  color: colors.Secondary_Black_Text,
});

export const value = css({
  margin: 0,
  ...typography.T_16_Semibold,
  color: colors.Secondary_Black_Text,
  display: `flex`,
  alignItems: `center`,
  overflowWrap: `break-word`,
  wordWrap: `break-word`,
  wordBreak: `break-word`,
});
export const networkIcon = css({
  width: utils.remConverter(15),
  height: `auto`,
  marginRight: utils.remConverter(2),
});
export const listContainer = css({
  listStyle: `none`,
  padding: 0,
  maxHeight: 400,
  overflowY: `auto`,
});
export const listItem = css({
  margin: `0 ${utils.remConverter(16)}`,
  padding: `${utils.remConverter(16)} 0`,
  borderTop: `1px solid ${colors.Grey_Border}`,
  '&:first-child': {
    border: 0,
  },
});
export const cardScroll = css({
  background: colors.Secondary_White,
  boxShadow: colors.Shadow_Outer_Dropdown,
  borderRadius: 4,
  maxHeight: 400,
  overflowY: `auto`,
});

export const loaderContainer = css({
  display: `flex`,
  flexDirection: `column`,
  justifyContent: `center`,
  alignItems: `center`,
  height: 700,
});
