import { colors, mixins, typography, utils } from '@styles/shared';
import { css } from '@emotion/react';
import { mq, mqMinWidth } from '@styles/shared/mediaQueries';
import { formHeight } from '@components/Kyc/styles';

export const whitelistContainer = css({
  position: `relative`,
  height: `100%`,
});

export const checkAnimation = css({
  // margin: `0 auto ${utils.remConverter(50)} auto`,
  // width: utils.remConverter(134),
  // height: utils.remConverter(134),
  aspectRatio: `1/1`,
  width: `80%`,
  position: `relative`,
  zIndex: 9,
});

export const whitelistAnimation = css([
  {
    position: `fixed`,
    top: 0,
    left: 0,
    width: `100%`,
    zIndex: -1,
    [mqMinWidth[1]]: {
      width: `var(--hocWidth)`,
      left: `50%`,
      transform: `translateX(-50%)`,
    },
  },
  {
    // ...mixins.desktopHeightPositionTop,
  },
]);

export const whitelistText = css({
  ...typography.T_28_Bold,
  color: colors.Secondary_Black_Text,
  marginBottom: utils.remConverter(8),
});

export const whitelistDescription = css({
  ...typography.T_20_Regular,
  color: colors.Secondary_Black_Text,
});

export const clickToView = css([
  {
    ...typography.T_20_Bold,
    textTransform: `uppercase`,
    color: colors.Secondary_Black_Text,
    zIndex: 10,
    width: `calc(var(--hocWidth) - 20px)`,
    position: `fixed`,
    bottom: 0,
    marginBottom: utils.remConverter(24),
  },
  // { ...mixins.desktopPositionBottom },
]);

export const loader = css({
  width: utils.remConverter(25),
  marginLeft: utils.remConverter(10),
});

export const nftVideo = css({
  width: `100%`,
  height: `auto`,
});

export const video = css({
  display: `none`,
  width: `100%`,
  height: `auto`,
  objectFit: `contain`,
});

export const image = css({
  display: `none`,
  width: `100%`,
  height: `auto`,
  maxHeight: `${utils.remConverter(435)}`,
  objectFit: `contain`,
});

export const wrapper = css({
  height: `calc(50% - 83px)`,
});

export const popupContent = css({
  marginTop: utils.remConverter(150),
});
export const nftName = css({
  ...typography.T_20_Bold,
});

export const formLabel = css({
  color: colors.Secondary_Black_Text,
  marginBottom: utils.remConverter(20),
  ...typography.T_16_Semibold,
  padding: `0 ${utils.remConverter(16)}`,
});

export const formGroup = css({
  marginBottom: utils.remConverter(4),
  display: `flex`,
  padding: `0 ${utils.remConverter(16)}`,
});

export const mobile = css({
  width: `100%`,
});

export const pinStyle = {
  width: `64px`,
  height: `64px`,
  padding: `12px`,
  color: colors.Secondary_Black_Text,
  backgroundColor: colors.Primary_Bg_Grey,
  boxShadow: `inset -2px -2px 10px #FAFBFF, inset 2px 2px 10px #C6C9D3`,
  WebkitAppearance: `none`,
  borderRadius: `10px`,
  border: `0px`,
  ...typography.T_20_Regular,
  textAlign: `center`,
};

export const InvalidPinStyle = {
  width: `64px`,
  height: `64px`,
  padding: `12px`,
  backgroundColor: colors.Primary_Bg_Grey,
  boxShadow: `inset 2px 2px 10px #C6C9D3`,
  border: `3px solid ${colors.Tertiary_Red}`,
  borderRadius: utils.remConverter(10),
  ...typography.T_20_Regular,
  textAlign: `center`,
};

export const errorText = css({
  ...typography.T_12_Regular,
  color: colors.Tertiary_Red,
  padding: `0 16px`,
});

export const pinsContainer = {
  width: `100%`,
  display: `flex !important`,
  justifyContent: `space-between !important`,
};

export const pinButton = css({
  background: colors.Primary_Yellow,
  boxShadow: colors.Shadow_Btn_P_Outer_Sharp,
  borderRadius: `50px`,
  padding: `12px`,
  width: `100%`,
  border: `0`,
  color: colors.Secondary_Black_Text,
  ...typography.T_20_Bold,
  zIndex: 4,
});

export const buttonContainer = css({
  padding: utils.remConverter(16),
  background: colors.Secondary_White,
  borderTop: `1px solid ${colors.Grey_Border}`,
  width: `var(--hocWidth)`,
  [mq[0]]: {
    // position: `fixed`,
  },
});

export const browseButtonContainer = css({
  padding: utils.remConverter(16),
  background: colors.Secondary_White,
  borderTop: `1px solid ${colors.Grey_Border}`,
  width: `var(--hocWidth)`,
  position: `fixed`,
  bottom: 0,
});

export const browseButton = css({
  background: colors.Primary_Yellow,
  boxShadow: colors.Shadow_Btn_P_Outer_Sharp,
  borderRadius: `50px`,
  padding: `12px`,
  width: `100%`,
  border: `0`,
  color: colors.Secondary_Black_Text,
  ...typography.T_20_Bold,
  zIndex: 4,
});

export const successContainer = css({
  flexDirection: `column`,
  height: `100%`,
});

export const imgContainer = css({
  width: `100%`,
});
