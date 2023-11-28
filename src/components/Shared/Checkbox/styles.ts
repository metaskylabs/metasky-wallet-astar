import { css } from '@emotion/react';
import { colors, typography, utils } from '@styles/shared';

export const checkboxContainer = css({
  minWidth: utils.remConverter(16),
  margin: `${utils.remConverter(24)} 0`,
});

export const checkboxContainerWithBorder = css({
  minWidth: utils.remConverter(16),
  margin: 0,
});

export const labelContainer = css({
  display: `flex`,
  alignItems: `center`,
  justifyContent: `flex-start`,
  height: `auto`,
  position: `relative`,
  cursor: `pointer`,
  marginBottom: 0,
  ...typography.T_14_Regular,
  '&:hover': {
    'input ~ .checkmark': {
      backgroundColor: colors.Secondary_White,
    },
  },
});

export const disabledLabel = css({
  opacity: 0.5,
  cursor: `not-allowed`,
});

export const input = css({
  opacity: 0,
  cursor: `pointer`,
  height: 0,
  width: 0,
});

export const checkCheckmark = css({
  backgroundColor: colors.Primary_Blue,
  borderRadius: 4,
  '&:after': {
    display: `block`,
  },
});

export const checkLabel = css({
  marginLeft: utils.remConverter(40),
});

export const lableBorderBottom = css({
  borderBottom: `1px solid ${colors.Grey_Border}`,
  width: `80%`,
});

export const lablePadding = css({
  padding: `${utils.remConverter(12)} 0 ${utils.remConverter(12)} 0`,
});

export const checkComponent = css({
  marginLeft: utils.remConverter(40),
});

export const checkmark = css({
  position: `absolute`,
  top: `50%`,
  left: 0,
  transform: `translateY(-50%)`,
  height: utils.remConverter(24),
  width: utils.remConverter(24),
  backgroundColor: colors.Primary_Bg_Grey,
  boxShadow: colors.Shadow_Card_Outer_Sharp3,
  borderRadius: 4,
  '&:after': {
    content: `""`,
    position: `absolute`,
    display: `none`,
    left: 7,
    top: `45%`,
    width: 6,
    height: 11,
    border: `solid ${colors.Secondary_White}`,
    borderWidth: `0 2px 2px 0`,
    transform: `rotate(45deg) translate(-50%, -50%)`,
    borderRadius: 2,
  },
});
