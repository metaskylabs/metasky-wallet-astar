import { css } from '@emotion/react';
import { walletDimension } from '@utils/constants';
import { colors, typography } from '.';
import { mqMinWidth } from './mediaQueries';

const mixins = {
  flex: css({
    display: `flex`,
  }),
  flexJustifiedBetween: css({
    display: `flex`,
    justifyContent: `space-between`,
  }),
  flexAlignEnd: css({
    display: `flex`,
    alignItems: `flex-end`,
  }),
  flexJustifiedCenter: css({
    display: `flex`,
    justifyContent: `center`,
  }),
  flexAlignBaseline: css({
    display: `flex`,
    alignItems: `baseline`,
  }),
  flexAlignJustifiedCenter: css({
    display: `flex`,
    justifyContent: `center`,
    alignItems: `center`,
  }),
  flexAlignCenterJustifiedBetween: css({
    display: `flex`,
    justifyContent: `space-between`,
    alignItems: `center`,
  }),
  flexAlignCenterJustifiedStart: css({
    display: `flex`,
    justifyContent: `start`,
    alignItems: `center`,
  }),
  flexJustifiedStart: css({
    display: `flex`,
    justifyContent: `start`,
  }),
  flexAlignBaselineJustifiedBetween: css({
    display: `flex`,
    justifyContent: `space-between`,
    alignItems: `baseline`,
  }),
  flexJustifiedEnd: css({
    display: `flex`,
    justifyContent: `flex-end`,
  }),
  flexAlignCenter: css({
    display: `flex`,
    alignItems: `center`,
  }),
  flexAlignStart: css({
    display: `flex`,
    alignItems: `flex-start`,
  }),
  flexNoWrap: css({ flexWrap: `nowrap` }),
  flexColumn: css({ display: `flex`, flexDirection: `column` }),

  textCapitalize: css({
    textTransform: `capitalize`,
  }),
  textUppercase: css({
    textTransform: `uppercase`,
  }),
  textAlignmentCenter: css({
    textAlign: `center`,
  }),
  textAlignmentLeft: css({
    textAlign: `left`,
  }),
  textAlignmentRight: css({
    textAlign: `right`,
  }),
  positionRelative: css({
    position: `relative`,
  }),
  cursorPointer: css({
    cursor: `pointer`,
  }),
  desktopMaxHeight: css({
    [mqMinWidth[1]]: {
      maxHeight: `90vh`,
    },
  }),
  capitalizeText: css({
    textTransform: `lowercase`,
    ':first-letter': {
      textTransform: `capitalize`,
    },
  }),
  placeholderTextstyle: css({
    '&::placeholder': {
      ...typography.T_14_Regular,
      color: colors.Grey_Text,
      textTransform: `none`,
    },
  }),
  desktopHocWrapper: css({
    [mqMinWidth[5]]: {
      height: walletDimension.height,
      maxHeight: `90vh`,
      width: walletDimension.width,
      position: `relative`,
      margin: `auto`,
      top: `var(--containerHeight)`,
      bottom: `var(--containerHeight)`,
    },
  }),
  desktopHeight: css({
    [mqMinWidth[1]]: {
      height: walletDimension.height,
    },
  }),
  bottomsheetContainer: css({
    [mqMinWidth[1]]: {
      position: `sticky`,
    },
  }),
  bottomsheetBackdrop: css({
    [mqMinWidth[1]]: {
      position: `fixed`,
      height: `100vh`,
    },
  }),
  overflowHidden: {
    [mqMinWidth[1]]: {
      overflow: `hidden`,
      height: `100%`,
    },
  },
  modalContainermodalContainer: css({
    [mqMinWidth[1]]: {
      top: `var(--containerHeight)`,
      bottom: `var(--containerHeight)`,
      left: `50%`,
      right: `50%`,
      transform: `translateX(-50%)`,
    },
  }),
  fullSize: css({
    width: `100%`,
    height: `100%`,
  }),
};
export default mixins;
