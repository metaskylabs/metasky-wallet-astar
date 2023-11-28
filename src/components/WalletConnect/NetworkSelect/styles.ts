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
export const innerWrapper = css({
  display: `flex`,
  flexDirection: `column`,
  justifyContent: `space-between`,
  height: `100%`,
});
export const logoConatiner = css({
  margin: `0 auto`,
  width: utils.remConverter(142),
  height: utils.remConverter(142),
  borderRadius: `100%`,
  background: colors.Grey_Border,
  padding: utils.remConverter(30),
  marginBottom: utils.remConverter(24),
});

export const logoImg = css({
  width: `100%`,
  height: `100%`,
  objectFit: `contain`,
  borderRadius: `100%`,
});

export const title = css({
  ...typography.T_20_Bold,
  textAlign: `center`,
  marginBottom: utils.remConverter(4),
});
export const subTitle = css({
  ...typography.T_16_Regular,
  textAlign: `center`,
  marginBottom: utils.remConverter(40),
});
export const selectWrapper = css({
  position: `relative`,
});
export const label = css({
  ...typography.T_16_Semibold,
  marginBottom: utils.remConverter(8),
});
export const selectedBlock = css({
  background: colors.Primary_Bg_Grey,
  boxShadow: colors.Shadow_Input_Inner_Smooth,
  padding: utils.remConverter(12),
  display: `flex`,
  flexDirection: `row`,
  justifyContent: `space-between`,
  alignItems: `center`,
  cursor: `pointer`,
});
export const selectedNetwork = css({
  display: `flex`,
  flexDirection: `row`,
  alignItems: `center`,
  ...typography.T_14_Regular,
  whiteSpace: `nowrap`,
  overflow: `hidden`,
  textOverflow: `ellipsis`,
});
export const networkIcon = css({
  width: utils.remConverter(12),
  height: `auto`,
  marginRight: utils.remConverter(11),
});

export const dropDownArrow = css({
  transform: `rotate(90deg)`,
  transition: `all .4s ease-out`,
});

export const openDropDownArrow = css({
  transform: `rotate(-90deg)`,
});

export const trustDetails = css({
  maxWidth: 300,
  margin: `0 auto`,
  ...typography.T_14_Regular,
});

export const headerOne = css({
  marginBottom: utils.remConverter(8),
});
export const checkList = css({
  listStyle: `none`,
  padding: 0,
});
export const checkItem = css({
  marginBottom: utils.remConverter(8),
});
export const checkItemImage = css({
  width: utils.remConverter(15),
  height: `auto`,
  marginRight: utils.remConverter(12),
});
export const trustDesc = css({
  textAlign: `center`,
  display: `flex`,
  alignItems: `center`,
  justifyContent: `center`,
});

export const trustDescImage = css({
  width: utils.remConverter(15),
  height: `auto`,
  marginRight: utils.remConverter(7),
});

export const ddContainer = css({
  background: colors.Secondary_White,
  boxShadow: colors.Shadow_Outer_Dropdown,
  borderRadius: 4,
  position: `absolute`,
  left: 0,
  right: 0,
  marginTop: utils.remConverter(8),
});
export const ddListContainer = css({
  listStyle: `none`,
  padding: 0,
  maxHeight: 400,
  overflowY: `auto`,
});
export const ddListItem = css({
  margin: `0 ${utils.remConverter(16)}`,
  padding: `${utils.remConverter(16)} 0`,
  borderTop: `1px solid ${colors.Grey_Border}`,
  '&:first-child': {
    border: 0,
  },
});
