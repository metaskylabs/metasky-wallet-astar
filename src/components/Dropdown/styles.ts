import { css } from '@emotion/react';
import { colors, typography, utils } from '@styles/shared';

export const dropdown = css({
  // margin: `${utils.remConverter(20)} ${utils.remConverter(16)}`,
});

export const dropdownContent = css({
  ...typography.T_14_Regular,
  color: colors.Secondary_Black_Text,
});

export const sortButton = css({
  background: colors.Secondary_White,
  boxShadow: colors.Shadow_Input_Inner_Smooth,
  padding: `${utils.remConverter(9)} ${utils.remConverter(12)}`,
  width: `100%`,
  height: utils.remConverter(48),
  borderRadius: 4,
  cursor: `pointer`,
  position: `relative`,
});

export const sortByText = css({
  ...typography.T_14_Semibold,
  marginLeft: utils.remConverter(8),
  color: colors.Secondary_Black_Text,
});

export const divider = css({
  margin: `0px ${utils.remConverter(16)}`,
  borderBottom: `1px solid ${colors.Grey_Border}`,
});

export const sortItem = css({
  ...typography.T_14_Regular,
  padding: `${utils.remConverter(16)}`,
  color: colors.Secondary_Black_Text,
  cursor: `pointer`,
});

// export const filterContainer = css({
//   margin: `${utils.remConverter(16)} 0px`,
//   boxShadow: colors.Shadow_Outer_Dropdown,
//   position: `absolute`,
//   width: `100%`,
//   zIndex: 9,
//   background: colors.Secondary_White,
//   maxHeight: utils.remConverter(264),
//   overflowY: `scroll`,
// });

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
  zIndex: 99,
  overflowY: `auto`,
  width: `100%`,
  '&::-webkit-scrollbar': {
    display: `none`,
  },
});

export const arrowDown = css({
  transform: `rotate(180deg)`,
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
    backgroundColor: colors.Grey_Border,
  },
});
