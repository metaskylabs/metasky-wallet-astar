import { colors, typography, utils } from '@styles/shared';
import { css } from '@emotion/react';

export const icon = css({
  display: `flex`,
  alignItems: `center`,
  justifyContent: `center`,
  width: `142px`,
  height: `142px`,
  margin: `auto`,
  marginTop: `43px`,
  marginBottom: `43px`,
  background: colors.Grey_Border,
  borderRadius: `50%`,
});

export const headerWrapper = css({
  marginTop: utils.remConverter(20),
  marginLeft: utils.remConverter(16),
});

export const title = css({
  color: colors.Secondary_Black_Text,
  ...typography.T_20_Bold,
});

export const formLabel = css({
  color: colors.Secondary_Black_Text,
  ...typography.T_16_Semibold,
});

export const formGroup = css({
  marginTop: `20px`,
  display: `flex`,
});

export const mobile = css({
  flex: `1`,
});

export const input = css({
  width: `100%`,
  height: `48px`,
  padding: `12px`,
  color: colors.Secondary_Black_Text,
  backgroundColor: colors.Primary_Bg_Grey,
  boxShadow: colors.Shadow_Input_Inner_Smooth,
  borderRadius: `10px`,
  border: `0`,
  WebkitAppearance: `none`,
  ...typography.T_16_Regular,
  '&: focus': {
    outline: `none`,
  },
  '&::placeholder': {
    color: colors.Grey_Text,
    textTransform: `none`,
  },
});

export const button = css({
  background: colors.Primary_Yellow,
  boxShadow: colors.Shadow_Btn_P_Outer_Sharp,
  borderRadius: `50px`,
  padding: `12px`,
  width: `100%`,
  border: `0`,
  ...typography.T_20_Bold,
});

export const hr = css({
  height: `1px`,
  background: colors.Grey_Border,
  width: `100%`,
  textAlign: `center`,
  margin: `32px 0 15px`,
});

export const errorMessage = css({
  ...typography.T_12_Regular,
  color: colors.Tertiary_Red,
  marginTop: utils.remConverter(8),
  marginLeft: utils.remConverter(5),
});

export const link = css({
  color: colors.Primary_Blue,
  border: `0`,
  background: `transparent`,
  ...typography.T_16_Semibold,
});

export const textCenter = css({
  textAlign: `center`,
});

export const buttonContainer = css([
  {
    position: `fixed`,
    display: `flex`,
    bottom: 0,
    width: `var(--hocWidth)`,
    padding: utils.remConverter(16),
    background: colors.Secondary_White,
    color: colors.Secondary_Black_Text,
    borderTop: `1px solid ${colors.Grey_Border}`,
  },
]);

export const loader = css({
  width: utils.remConverter(25),
  marginLeft: utils.remConverter(10),
});
