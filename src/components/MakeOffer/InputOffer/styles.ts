import { css } from '@emotion/react';
import { colors, typography, utils } from '@styles/shared';
import * as inputStyle from '@components/NFTConfirmListing/components/AmountInput/styles';
import { relative } from 'path';

export const container = css({
  background: colors.Tertiary_Blue,
  padding: utils.remConverter(12),
  borderRadius: `4px 4px 0 0`,
  position: `relative`,
});

export const inputBase = css([
  inputStyle.input,
  {
    borderRadius: 4,
  },
]);

export const dropdownContainer = css({
  width: utils.remConverter(152),
  backgroundColor: colors.Secondary_White,
  boxShadow: colors.Shadow_Outer_Dropdown,
  borderRadius: 4,
});

export const dropDownWrapper = css({
  position: `absolute`,
  top: `70%`,
  paddingTop: `0`,
});

export const dropdownItem = css({
  width: `100%`,
  padding: `${utils.remConverter(16)}`,
  borderRadius: 0,
  cursor: `pointer`,
  borderBottom: `${utils.remConverter(1)} solid ${colors.Grey_Border}`,
  ':last-child': {
    borderBottom: `none`,
  },
});

export const dropdownItemImg = css({
  width: utils.remConverter(20),
  height: utils.remConverter(20),
  marginRight: utils.remConverter(8),
});

export const dropdownItemTitle = css({
  ...typography.T_14_Regular,
  color: colors.Secondary_Black_Text,
});

export const dropdownItemDivider = css({
  width: `100%`,
  backgroundColor: `${colors.Grey_Border}`,
  height: utils.remConverter(1),
  margin: `${utils.remConverter(16)} 0`,
});

export const dropdownItemText = css({
  ...typography.T_12_Regular,
  color: colors.Black,
  marginBottom: utils.remConverter(16),
});

export const arrowToggle = css({
  width: utils.remConverter(16),
  height: utils.remConverter(16),
});

export const arrowToggleOpen = css({
  transform: `rotate(-180deg)`,
  transition: `0.2s ease-in-out all`,
});
