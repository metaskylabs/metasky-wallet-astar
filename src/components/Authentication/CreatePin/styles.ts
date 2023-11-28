import { colors, mixins, typography, utils } from '@styles/shared';
import { css } from '@emotion/react';

export const title = css({
  color: colors.Secondary_Black_Text,
  ...typography.T_20_Bold,
});

export const formLabel = css({
  color: colors.Secondary_Black_Text,
  ...typography.T_16_Semibold,
  padding: `0 15.5px`,
});

export const createPinContainer = css({
  ...mixins.flexJustifiedBetween,
  ...mixins.flexColumn,
});

export const ctaContainer = css({
  padding: `0 ${utils.remConverter(16)} ${utils.remConverter(32)}`,
});

export const formGroup = css({
  marginBottom: utils.remConverter(24),
  display: `flex`,
  padding: `${utils.remConverter(5)} ${utils.remConverter(16)}`,
});

export const mobile = css({
  display: `flex`,
  gap: `34px`,
  width: `100%`,
});

export const input = css({
  width: `64px`,
  height: `64px`,
  padding: `12px`,
  color: colors.Secondary_Black_Text,
  backgroundColor: colors.Primary_Bg_Grey,
  boxShadow: `inset -2px -2px 10px #FAFBFF, inset 2px 2px 10px #C6C9D3`,
  borderRadius: `10px`,
  border: `0`,
  textAlign: `center`,
  fontSize: `24px`,
  '&: focus': {
    outline: `none`,
  },
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

export const link = css({
  color: colors.Primary_Blue,
  border: `0`,
  background: `transparent`,
  ...typography.T_16_Semibold,
});

export const textCenter = css({
  textAlign: `center`,
});

export const changelink = css({
  display: `flex`,
  alignItems: `center`,
  marginTop: `20px`,
  color: colors.Primary_Blue,
  border: `0`,
  background: `transparent`,
  ...typography.T_14_Semibold,
});

export const changelinkIcon = css({
  marginRight: `5px`,
  lineHeight: `0`,
});

export const labelValue = css({
  color: colors.Secondary_Black_Text,
});

export const text = css({
  margin: `0 0 ${utils.remConverter(24)} 0`,
  color: colors.Secondary_Black_Text,
  ...typography.T_14_Regular,
  padding: `0 15.5px`,
});

export const buttonContainer = css([
  {
    padding: utils.remConverter(16),
    width: `var(--hocWidth)`,
  },
]);

export const errorEnable = css({
  ...typography.T_12_Regular,
  color: `#EE2641`,
  padding: `0 ${utils.remConverter(16)}`,
  marginTop: utils.remConverter(4),
});

export const errorDisable = css({
  ...typography.T_12_Regular,
  color: colors.Primary_Bg_Grey,
});

export const bottomSheetHeight = css({
  height: `100%`,
  display: `flex`,
  alignItems: `center`,
  justifyContent: `center`,
  borderRadius: 0,
  padding: `0px`,
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

export const successPinStyle = {
  width: `64px`,
  height: `64px`,
  padding: `12px`,
  backgroundColor: colors.Primary_Bg_Grey,
  boxShadow: `inset 2px 2px 10px #C6C9D3`,
  border: `3px solid ${colors.Tertiary_Green}`,
  borderRadius: utils.remConverter(10),
  ...typography.T_20_Regular,
  textAlign: `center`,
};

export const pinsContainer = {
  width: `100%`,
  display: `flex !important`,
  justifyContent: `space-between !important`,
};

export const mb = css({
  marginBottom: utils.remConverter(50),
});

export const loader = css({
  width: utils.remConverter(25),
  marginLeft: utils.remConverter(10),
});
