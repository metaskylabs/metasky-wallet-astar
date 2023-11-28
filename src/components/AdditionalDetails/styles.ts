import { css } from '@emotion/react';
import { colors, mixins, typography, utils } from '@styles/shared';

export const userBlockerContainer = css({
  height: `100%`,
  overflowY: `scroll`,
});

export const banner = css({
  top: utils.remConverter(0),
  minimumHeight: utils.remConverter(150),
  padding: `${utils.remConverter(23)} ${utils.remConverter(
    22,
  )} 0 ${utils.remConverter(36)}`,
  background: colors.Secondary_White,
  display: `flex`,
  gap: utils.remConverter(24),
  marginBottom: utils.remConverter(23),
});

export const humanFigure = css({
  bottom: 0,
  maxHeight: utils.remConverter(120),
});

export const title = css({
  padding: `0 ${utils.remConverter(16)}`,
  marginBottom: utils.remConverter(20),
});

export const bannerTextContainer = css({
  alignSelf: `center`,
});

export const formContainer = css({
  padding: `0 ${utils.remConverter(16)}`,
  paddingBottom: utils.remConverter(60),
});

export const inputContainer = css({
  marginBottom: utils.remConverter(46),
});

export const input = css({
  width: `100%`,
  height: `48px`,
  padding: `12px`,
  color: colors.Secondary_Black_Text,
  backgroundColor: colors.Primary_Bg_Grey,
  boxShadow: `inset -2px -2px 10px #FAFBFF, inset 2px 2px 10px #C6C9D3`,
  WebkitAppearance: `none`,
  borderRadius: `10px`,
  border: `0`,
  // marginBottom:utils.remConverter(46),
  ...typography.T_16_Regular,
  '&: focus': {
    outline: `none`,
  },
  '&::placeholder': {
    color: colors.Grey_Text,
    textTransform: `none`,
  },
});

export const loginForm = css({
  marginTop: `46px`,
  padding: `0 16px`,
});
export const formLabel = css({
  color: colors.Secondary_Black_Text,
  marginBottom: utils.remConverter(20),
  ...typography.T_16_Semibold,
});

export const errorMessage = css({
  ...typography.T_12_Regular,
  color: colors.Tertiary_Red,
  marginTop: utils.remConverter(8),
  marginLeft: utils.remConverter(5),
});

export const button = css({
  background: colors.Primary_Yellow,
  boxShadow: colors.Shadow_Btn_P_Outer_Sharp,
  borderRadius: `50px`,
  padding: `12px`,
  width: `100%`,
  border: `0`,
  color: colors.Secondary_Black_Text,
  ...typography.T_20_Bold,
});

export const loader = css({
  width: utils.remConverter(25),
  marginLeft: utils.remConverter(10),
});

export const buttonContainer = css({
  padding: utils.remConverter(16),
  background: colors.Secondary_White,
  borderTop: `1px solid ${colors.Grey_Border}`,
  width: `var(--hocWidth)`,
});

export const labelContainer = css({
  display: `flex`,
  justifyContent: `space-between`,
});
export const redText = css({
  fontSize: utils.remConverter(25),
  color: colors.Tertiary_Red,
});
export const bannerTitle = css({
  ...typography.T_20_Bold,
});
export const bannerDesc = css({
  ...typography.T_16_Regular,
});
