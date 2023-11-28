import { css } from '@emotion/react';
import { colors, typography, utils } from '@styles/shared';

export const linkContainer = css({
  backgroundColor: colors.Primary_Bg_Grey,
  boxShadow: colors.Shadow_Info_Inner_Smooth,
  borderRadius: 25,
  padding: `${utils.remConverter(9)} ${utils.remConverter(13)}`,
  width: utils.remConverter(216),
  margin: `0 auto ${utils.remConverter(8)} auto`,
});

export const imgContainer = css({
  height: utils.remConverter(20),
  width: utils.remConverter(20),
});

export const url = css({
  ...typography.T_12_Regular,
  color: colors.Secondary_Black_Text,
  marginLeft: `10px`,
});

export const arrowToggle = css({
  width: utils.remConverter(16),
  height: utils.remConverter(16),
});

export const dropdownContainer = css({
  position: `absolute`,
  right: `50%`,
  transform: `translate(50%)`,
  width: utils.remConverter(216),
  backgroundColor: colors.Secondary_White,
  boxShadow: colors.Shadow_Outer_Dropdown,
  borderRadius: 4,
  padding: `0 ${utils.remConverter(8)} ${utils.remConverter(8)}}`,
});

export const dropdownItem = css({
  width: `100%`,
  padding: `${utils.remConverter(8)}`,
  borderRadius: 0,
  cursor: `pointer`,
  borderBottom: `${utils.remConverter(1)} solid ${colors.Grey_Border}`,
  paddingBottom: utils.remConverter(8),
  ':last-child': {
    borderBottom: `none`,
    paddingBottom: 0,
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
