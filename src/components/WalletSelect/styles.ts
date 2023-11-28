import { css } from '@emotion/react';
import { colors, typography, utils } from '@styles/shared';

export const selectButton = css({
  marginBottom: utils.remConverter(30),
  width: `100%`,
});

export const buttonArrowOpen = css({
  transform: `rotate(-180deg)`,
  transition: `0.2s ease-in-out all`,
});

export const buttonArrowIcon = css({
  width: utils.remConverter(24),
  height: utils.remConverter(24),
});

export const image = css({
  marginRight: utils.remConverter(8),
  width: utils.remConverter(48),
  height: utils.remConverter(48),
});

export const optionContainer = css({
  padding: utils.remConverter(12),
  borderRadius: 4,
  border: 0,
  position: `absolute`,
  top: `calc(100% + ${utils.remConverter(12)})`,
  left: 0,
  right: 0,
  margin: 0,
  boxShadow: colors.Shadow_Outer_Dropdown,
  backgroundColor: colors.Secondary_White,
  listStyle: `none`,
  maxHeight: utils.remConverter(342),
  zIndex: 10,
  overflowY: `auto`,
  width: `100%`,
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
  ...typography.T_14_Bold,
  color: colors.Secondary_Black_Text,
});

export const searchInput = css({
  ...typography.T_16_Regular,
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

export const inputFormLabel = css({
  ...typography.T_16_Semibold,
  marginBottom: utils.remConverter(8),
  width: `30%`,
  minWidth: `30%`,
});

export const iconLabel = css({
  marginLeft: utils.remConverter(5),
  color: colors.Secondary_Black_Text,
  textTransform: `capitalize`,
});

export const inputFormImage = css({
  width: utils.remConverter(20),
  height: utils.remConverter(20),
});

export const selectedContainer = css({
  width: `100%`,
  height: utils.remConverter(48),
  border: 0,
  borderRadius: 4,
  backgroundColor: colors.Primary_Bg_Grey,
  boxShadow: colors.Shadow_Input_Inner_Smooth,
  padding: `${utils.remConverter(12)} ${utils.remConverter(8)}`,
  paddingRight: utils.remConverter(4),
  color: colors.Secondary_Black_Text,
  transition: `0.3s`,
  ...typography.T_14_Regular,
  cursor: `pointer`,
});

export const clamp = css({
  wordBreak: `break-all`,
  overflow: `hidden`,
  textOverflow: `ellipsis`,
  display: `-webkit-box`,
  WebkitLineClamp: `1`,
  WebkitBoxOrient: `vertical`,
});

export const emptyIconContainer = css({
  height: utils.remConverter(142),
  width: utils.remConverter(142),
  backgroundColor: colors.Primary_Bg_Grey,
  borderRadius: `100%`,
});

export const optionItemContainer = css({
  width: `100%`,
});

export const errorMessage = css({
  ...typography.T_12_Regular,
  color: colors.Tertiary_Red,
  marginTop: utils.remConverter(4),
});
