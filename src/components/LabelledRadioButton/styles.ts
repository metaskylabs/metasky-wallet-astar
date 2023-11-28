import { css } from '@emotion/react';
import utils from '@styles/shared/utils';
import { colors, mixins, typography } from '@styles/shared';

export const inputRadioContainer = css({
  ...typography.T_14_Regular,
  marginRight: utils.remConverter(40),
  paddingLeft: utils.remConverter(25),
  position: `relative`,
  display: `block`,
  color: colors.Secondary_Black_Text,
  '& > input': {
    position: `absolute`,
    opacity: 0,
  },
  '& > .checkmark': {
    position: `absolute`,
    top: 0,
    left: 0,
    height: utils.remConverter(20),
    width: utils.remConverter(20),
    backgroundColor: colors.Primary_Blue,
    border: `${utils.remConverter(1)} solid ${colors.Grey_Text}`,
    borderRadius: `50%`,
    boxShadow: colors.Shadow_Info_Inner_Smooth,
  },
  '& > input:checked ~ .checkmark:after': {
    display: `block`,
  },
  '& > .checkmark:after': {
    top: `4px`,
    left: `4px`,
    width: utils.remConverter(10),
    height: utils.remConverter(10),
    backgroundColor: colors.Primary_Blue,
    boxShadow: colors.Shadow_Btn_P_Outer_Sharp,
    borderRadius: `50%`,
  },
});
export const inputRadioContainerActive = css({
  ...typography.T_14_Regular,
  marginRight: utils.remConverter(40),
  paddingLeft: utils.remConverter(25),
  position: `relative`,
  display: `block`,
  color: colors.Secondary_Black_Text,
  '& > input': {
    position: `absolute`,
    opacity: 0,
  },
  '& > .checkmark': {
    position: `absolute`,
    top: 0,
    left: 0,
    height: utils.remConverter(20),
    width: utils.remConverter(20),
    backgroundColor: colors.Primary_Blue,
    border: `${utils.remConverter(1)} solid ${colors.Primary_Blue}`,
    borderRadius: `50%`,
    boxShadow: colors.Shadow_Info_Inner_Smooth,
  },
  '& > input:checked ~ .checkmark:after': {
    display: `block`,
  },
  '& > .checkmark:after': {
    top: `4px`,
    left: `4px`,
    width: utils.remConverter(10),
    height: utils.remConverter(10),
    backgroundColor: colors.Primary_Blue,
    boxShadow: colors.Shadow_Btn_P_Outer_Sharp,
    borderRadius: `50%`,
  },
});

export const inputRadioBase = css({
  marginRight: utils.remConverter(8),
});

export const inputRadioLabel = css({
  '&:after': {
    content: `""`,
    position: `absolute`,
    display: `none`,
  },
});

export const disable = css({
  opacity: 0.5,
});
