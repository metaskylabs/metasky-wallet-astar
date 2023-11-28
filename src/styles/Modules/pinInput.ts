import { colors, typography, utils } from '../shared';

export const pinStyle = {
  width: `64px`,
  height: `64px`,
  padding: `12px`,
  color: colors.Primary_Blue,
  backgroundColor: colors.Primary_Bg_Grey,
  boxShadow: `inset -2px -2px 10px #FAFBFF, inset 2px 2px 10px #C6C9D3`,
  WebkitAppearance: `none`,
  borderRadius: `10px`,
  border: `0`,
  ...typography.T_20_Regular,
  textAlign: `center`,
};

export const InvalidPinStyle = {
  width: `64px`,
  height: `64px`,
  padding: `12px`,
  color: colors.Primary_Blue,
  backgroundColor: colors.Primary_Bg_Grey,
  boxShadow: `inset -2px -2px 10px #FAFBFF, inset 2px 2px 10px #C6C9D3`,
  border: `3px solid ${colors.Tertiary_Red}`,
  borderRadius: utils.remConverter(10),
  ...typography.T_20_Regular,
  textAlign: `center`,
};

export const successPinStyle = {
  width: `64px`,
  height: `64px`,
  padding: `12px`,
  color: colors.Primary_Blue,
  backgroundColor: colors.Primary_Bg_Grey,
  boxShadow: `inset -2px -2px 10px #FAFBFF, inset 2px 2px 10px #C6C9D3`,
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
