import { css } from '@emotion/react';
import { colors, typography, utils } from '../shared';
import { mixins } from '@styles/shared';

export const bodyBlur = css({
  filter: `blur(10px)`,
});

export const loaderContainer = {
  marginTop: 0,
};

export const nftContainer = css({
  margin: `0 ${utils.remConverter(16)}`,
  marginBottom: utils.remConverter(16),
  display: `flex`,
  flexWrap: `wrap`,
  gap: `16px`,
});

export const nftCardContainer = css({
  width: `calc(50% - 8px)`,
  wordWrap: `break-word`,
});

export const nftCard = css({
  marginLeft: 0,
  marginBottom: 0,
  marginTop: 0,
});

export const nftCardImage = css({
  height: utils.remConverter(178),
});

export const nftHeader = css({
  margin: `${utils.remConverter(25)} ${utils.remConverter(16)}`,
});

export const header = css({
  width: `100%`,
});

export const loader = css({
  position: `absolute`,
  top: `40%`,
  left: `50%`,
  transform: `translateX(-15px)`,
});

export const loaderContentInfo = css({
  textAlign: `center`,
  color: colors.Secondary_Black_Text,
});

export const loadMoreButton = css({
  padding: `0 ${utils.remConverter(15)}`,
  width: `auto`,
  margin: `0`,
});

export const loadMoreContainer = css({
  display: `flex`,
  justifyContent: `center`,
  marginBottom: utils.remConverter(16),
});

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

export const popoverContainer = css({
  border: `0px`,
  background: colors.Secondary_White,
  width: utils.remConverter(260),
  /* shadow/outer/dropdown */

  boxShadow: colors.Shadow_Outer_Dropdown,
  borderRadius: utils.remConverter(4),
  '&.popover .popover-arrow': { display: `none !important` },
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

export const divider = css({
  margin: `0px ${utils.remConverter(16)}`,
  borderBottom: `1px solid ${colors.Grey_Border}`,
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

export const tagContainer = css([
  mixins.flexJustifiedBetween,
  {
    padding: `0 ${utils.remConverter(16)}`,
    gap: utils.remConverter(16),
  },
]);

export const sortAndFilterContainer = css({
  display: `flex`,
  margin: `10px 20px`,
  gap: `10px`,
  '.dropdown': {
    width: `100%`,
  },
  button: {
    height: 38,
  },
});

export const styledFilterButton = css({
  backgroundColor: `transparent`,
  border: `none`,
  boxShadow: colors.Shadow_V1,
  borderRadius: utils.remConverter(4),
  color: colors.Black,
  fontWeight: 500,
  width: `100%`,
  height: `100%`,
});

export const styledFocusedFilterButton = css({
  backgroundColor: `transparent`,
  border: `1px solid ${colors.Primary_Blue}`,
  color: colors.Primary_Blue,
  boxShadow: colors.Shadow_V1,
  borderRadius: utils.remConverter(4),
  fontWeight: 500,
  width: `100%`,
  height: `100%`,
});

export const styledMenuItem = css({
  maxHeight: `250px`,
  width: `auto`,
  overflow: `auto`,
});
