import { css } from '@emotion/react';
import { colors, typography, utils } from '@styles/shared';

export const container = css({
  height: 700,
  position: `relative`,
  padding: `0 ${utils.remConverter(16)}`,
});

export const cta = css({
  width: `100%`,
});
export const header = css({
  ...typography.T_20_Bold,
  textAlign: `center`,
  marginBottom: utils.remConverter(24),
});

export const logoConatiner = css({
  margin: `0 auto`,
  width: utils.remConverter(142),
  height: utils.remConverter(142),
  borderRadius: `100%`,
  background: colors.Grey_Border,
  padding: utils.remConverter(30),
  marginBottom: utils.remConverter(24),
});

export const logoImg = css({
  width: `100%`,
  height: `100%`,
  objectFit: `contain`,
  borderRadius: `100%`,
});

export const title = css({
  ...typography.T_20_Bold,
  textAlign: `center`,
  marginBottom: utils.remConverter(4),
});
export const subTitle = css({
  ...typography.T_16_Regular,
  textAlign: `center`,
  marginBottom: utils.remConverter(40),
});
export const selectWrapper = css({
  position: `relative`,
});

export const addressBox = css({
  background: colors.Secondary_White,
  borderRadius: 4,
  listStyle: `none`,
  padding: 0,
  marginBottom: utils.remConverter(24),
});
export const listItem = css({
  margin: `0 ${utils.remConverter(16)}`,
  padding: `${utils.remConverter(12)} 0`,
  borderTop: `1px solid ${colors.Grey_Border}`,
  '&:first-child': {
    border: 0,
  },

  ...typography.T_14_Regular,
  color: colors.Secondary_Black_Text,
  display: `flex`,
  flexDirection: `row`,
  justifyContent: `space-between`,
  alignItems: `center`,
});

export const descriptionText = css({
  padding: utils.remConverter(16),
  background: colors.Primary_Bg_Grey,
  boxShadow: colors.Shadow_Input_Inner_Smooth,
  borderRadius: 4,
  maxHeight: 200,
  overflowY: `auto`,
});
