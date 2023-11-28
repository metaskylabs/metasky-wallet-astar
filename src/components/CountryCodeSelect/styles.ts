import { css } from '@emotion/react';
import { colors, typography, utils } from '@styles/shared';

export const selectButton = css({
  padding: utils.remConverter(4),
  margin: 0,
  width: `100%`,
  // cursor: `pointer`,
});

export const buttonArrowOpen = css({
  transform: `rotate(-180deg)`,
  transition: `0.2s ease-in-out all`,
});

export const buttonArrowIcon = css({
  width: utils.remConverter(12),
  height: utils.remConverter(12),
});

export const optionContainer = css({
  padding: utils.remConverter(12),
  borderRadius: 4,
  border: 0,
  position: `absolute`,
  top: `calc(100% + ${utils.remConverter(4)})`,
  left: 0,
  right: 0,
  margin: 0,
  boxShadow: colors.Shadow_Outer_Dropdown,
  backgroundColor: colors.Secondary_White,
  listStyle: `none`,
  maxHeight: utils.remConverter(240),
  zIndex: 10,
  overflowY: `auto`,
  width: utils.remConverter(230),
  '&::-webkit-scrollbar': {
    display: `none`,
  },
});

export const optionItem = css({
  padding: `${utils.remConverter(8)}`,
  borderRadius: 0,
  cursor: `pointer`,
  borderBottom: `${utils.remConverter(1)} solid ${colors.Grey_Border}`,
  paddingBottom: utils.remConverter(12),
  ':last-child': {
    borderBottom: `none`,
    paddingBottom: 0,
  },
  ':hover': {
    backgroundColor: colors.Secondary_White,
  },
});
export const selectedItem = css({
  backgroundColor: colors.Primary_Blue,
});

export const optionSelectedTick = css({
  width: utils.remConverter(16),
  height: utils.remConverter(16),
});

export const optionItemContents = css({
  ...typography.T_14_Regular,
  color: colors.Grey_Text,
});

export const searchInput = css({
  ...typography.T_12_Regular,
  backgroundColor: colors.Secondary_White,
  boxShadow: colors.Shadow_Info_Inner_Smooth,
  color: colors.Secondary_Black_Text,
  width: `100%`,
  padding: `${utils.remConverter(12)} ${utils.remConverter(16)}`,
  borderRadius: 4,
  border: 0,
  outline: `none`,
  paddingRight: utils.remConverter(25),
});

export const searchContainer = css({
  position: `relative`,
});

export const searchIconContainer = css({
  position: `absolute`,
  right: 0,
  bottom: 0,
  marginRight: `${utils.remConverter(8)}`,
  transform: `translateY(-50%)`,
});

export const searchIcon = css({
  width: utils.remConverter(12),
  height: utils.remConverter(12),
  marginTop: utils.remConverter(12),
});
