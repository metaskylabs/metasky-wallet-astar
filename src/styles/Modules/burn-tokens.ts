import { css } from '@emotion/react';
import { mq } from '@styles/shared/mediaQueries';
import { colors, mixins, typography, utils } from '../shared';

export const headerContainer = css({
  position: `relative`,
});

export const link = css({
  color: colors.Primary_Blue,
  cursor: `pointer`,
  marginTop: utils.remConverter(16),
});

export const bodyContainer = css({
  width: `100%`,
  padding: `0 ${utils.remConverter(10)}`,
  [mq[0]]: {
    paddingBottom: utils.remConverter(100),
  },
  overflowX: `hidden`,
});

export const cardAccessText = css({
  ...typography.T_20_Bold,
  margin: `${utils.remConverter(25)} 0`,
  textAlign: `center`,
});

export const benefitsText = css({
  ...typography.T_20_Bold,
  marginRight: utils.remConverter(20),
});

export const filterApply = css({
  ...typography.T_16_Bold,
  width: `100%`,
  margin: `${utils.remConverter(16)}`,
});

export const loaderContentInfo = css({
  textAlign: `center`,
  color: colors.Secondary_Black_Text,
});

export const inputContainer = css([
  {
    backgroundColor: colors.Primary_Bg_Grey,
    boxShadow: colors.Shadow_Input_Inner_Smooth,
    borderRadius: 4,
    width: `100%`,
    padding: `${utils.remConverter(16)}`,
    display: `flex`,
    justifyContent: `space-between`,
  },
]);

export const input = css([
  {
    ...typography.T_16_Regular,
    backgroundColor: colors.Primary_Bg_Grey,
    WebkitAppearance: `none`,
    border: `none`,
    paddingRight: utils.remConverter(38),
    resize: `none`,
    '&: focus': {
      outline: `none`,
    },
    '&:disabled': {
      opacity: 0.67,
    },
  },
  { ...mixins.placeholderTextstyle },
]);

export const searchInput = css([
  {
    ...typography.T_16_Regular,
    backgroundColor: colors.Primary_Bg_Grey,
    boxShadow: colors.Shadow_Input_Inner_Smooth,
    borderRadius: 4,
    WebkitAppearance: `none`,
    border: `none`,
    width: `100%`,
    padding: `${utils.remConverter(16)}`,
    paddingRight: utils.remConverter(38),
    resize: `none`,
    '&: focus': {
      outline: `none`,
    },
    '&:disabled': {
      opacity: 0.67,
    },
  },
  { ...mixins.placeholderTextstyle },
]);

export const dataContainer = css({
  display: `flex`,
  flexDirection: `column`,
  gap: `1rem`,
  width: `calc(100% - ${utils.remConverter(13 * 2)})`,
  margin: `1.5rem ${utils.remConverter(13)}`,
});

export const label = css({
  ...typography.T_14_Bold,
});

export const chip = css({
  ...typography.T_14_Regular,
  color: colors.Ribbon_Blue,
  lineHeight: 1,
  cursor: `pointer`,
  padding: `${utils.remConverter(2)} ${utils.remConverter(16)}`,
});

export const error = css({
  ...typography.T_14_Regular,
  color: colors.Tertiary_Red,
  display: `flex`,
  width: `100%`,
  marginTop: utils.remConverter(8),
});

export const message = css({
  ...typography.T_14_Regular,
  display: `flex`,
  width: `100%`,
  marginTop: utils.remConverter(8),
});

export const subtitle = css({
  ...typography.T_16_Regular,
  marginLeft: `1rem`,
});

export const backButton = css({
  position: `absolute`,
  top: `0`,
  left: `0`,
  margin: `${utils.remConverter(20)}`,
});
