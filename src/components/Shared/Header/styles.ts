import { colors, typography, utils } from '@styles/shared';
import { css } from '@emotion/react';

export const headerContainer = css({
  display: `flex`,
  alignItems: `center`,
  margin: `${utils.remConverter(20)} ${utils.remConverter(16)}`,
});
export const buttonContainer = css({
  flex: 2,
});
export const titleContainer = css({
  flex: 4,
  textAlign: `center`,
  ...typography.T_20_Bold,
  color: colors.Secondary_Black_Text,
  margin: `auto`,
});
export const actionContainer = css({
  flex: 2,
  display: `flex`,
  justifyContent: `flex-end`,
  alignItems: `center`,
  ...typography.T_16_Semibold,
  color: `${colors.Primary_Blue}`,
  background: `transparent`,
  border: `none`,
  gap: utils.remConverter(11),
});

export const filterButton = css({
  background: colors.Secondary_White,
  boxShadow: colors.Shadow_V1,
  width: utils.remConverter(40),
  minWidth: utils.remConverter(40),
  height: utils.remConverter(40),
  borderRadius: utils.remConverter(20),
  display: `flex`,
  justifyContent: `center`,
  alignItems: `center`,
  cursor: `pointer`,
  position: `relative`,
});
