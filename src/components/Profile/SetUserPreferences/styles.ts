import { css } from '@emotion/react';
import { colors, typography, utils } from '@styles/shared';

export const wrapper = css({
  padding: `0 ${utils.remConverter(16)}`,
});

export const mssg = css({
  ...typography.T_14_Regular,
  textAlign: `center`,
  color: colors.Secondary_Black_Text,
});

export const subText = css({
  ...typography.T_16_Semibold,
  color: colors.Secondary_Black_Text,
});

export const countrySelector = css({
  margin: `${utils.remConverter(24)} 0`,
  display: `flex`,
  flexDirection: `column`,
  gap: utils.remConverter(4),
  position: `relative`,
});

export const selectorWrapper = css({
  display: `flex`,
  flexDirection: `column`,
  gap: utils.remConverter(8),
});

export const selectedContainer = css({
  ...typography.T_14_Regular,
  width: `100%`,
  padding: utils.remConverter(12),
  background: colors.Primary_Bg_Grey,
  boxShadow: colors.Shadow_Input_Inner_Smooth,
  color: colors.Secondary_Black_Text,
  cursor: `pointer`,
});

export const optionContainer = css({
  padding: utils.remConverter(16),
  width: `100%`,
  background: colors.Secondary_White,
  boxShadow: colors.Shadow_Outer_Dropdown,
  borderRadius: utils.remConverter(4),
  listStyle: `none`,
  overflowY: `auto`,
  '&::-webkit-scrollbar': {
    display: `none`,
  },
  display: `flex`,
  flexDirection: `column`,
  gap: utils.remConverter(16),
  position: `absolute`,
  left: 0,
  right: 0,
  top: utils.remConverter(84),
});

export const optionItem = css({
  width: `100%`,
  cursor: `pointer`,
});

export const countryItem = css({
  ...typography.T_14_Regular,
  color: colors.Secondary_Black_Text,
  display: `flex`,
  alignItems: `center`,
  gap: utils.remConverter(10.4),
});

export const info = css({
  marginTop: utils.remConverter(6),
  display: `flex`,
  flexDirection: `column`,
  gap: utils.remConverter(12),
});
