import { css } from '@emotion/react';
import { colors, utils } from '@styles/shared';

export const wrapper = css({
  height: `100%`,
  display: `flex`,
  flexDirection: `column`,
});
export const renderWrapper = css({
  flexGrow: 1,
  overflowY: `auto`,
});
export const navContainer = css({
  background: colors.Secondary_White,
  padding: `0 ${utils.remConverter(17)}`,
  boxShadow: colors.Shadow_Bottom_Navbar,
  display: `flex`,
  justifyContent: `space-between`,
});
