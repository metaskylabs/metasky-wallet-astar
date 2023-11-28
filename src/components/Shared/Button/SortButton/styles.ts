import { colors, typography, utils } from '@styles/shared';
import { css } from '@emotion/react';
import AssetsImg from '@public/images';
import { relative } from 'path';

export const sortButton = css({
  background: colors.Secondary_White,
  boxShadow: colors.Shadow_V1,
  width: utils.remConverter(40),
  minWidth: utils.remConverter(40),
  height: utils.remConverter(40),
  borderRadius: utils.remConverter(20),
  display: `flex`,
  justifyContent: `center`,
  alignItems: `center`,
  cursor: `pointer`,
  position: `relative`,
});

export const filterContainer = css({
  margin: `${utils.remConverter(16)} 0px`,
  boxShadow: colors.Shadow_V1,
  position: `absolute`,
  width: utils.remConverter(260),
  zIndex: 9,
  right: 0,
  background: colors.Secondary_White,
});

export const sortIcon = css({
  padding: `0px ${utils.remConverter(16)}`,
  fontSize: utils.remConverter(24),
  marginBottom: utils.remConverter(19),
});

export const sortByText = css({
  ...typography.T_14_Semibold,
  marginLeft: utils.remConverter(8),
  color: colors.Secondary_Black_Text,
});

export const sortItem = css({
  ...typography.T_14_Regular,
  padding: `${utils.remConverter(16)}`,
  color: colors.Secondary_Black_Text,
  cursor: `pointer`,
  ':hover': {
    backgroundColor: colors.Grey_Border,
  },
});

export const sortItemSelected = css({
  color: colors.Primary_Blue,
});

export const sortIconIndicator = css({
  width: utils.remConverter(8),
  height: utils.remConverter(8),
  borderRadius: utils.remConverter(4),
  backgroundColor: colors.Primary_Blue,
  position: `absolute`,
  top: 0,
  right: 0,
});

export const divider = css({
  margin: `0px ${utils.remConverter(16)}`,
  borderBottom: `1px solid ${colors.Grey_Border}`,
});
