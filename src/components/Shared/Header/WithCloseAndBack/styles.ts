import { css } from '@emotion/react';
import { colors, typography, utils } from '@styles/shared';

export const container = css({
  display: `flex`,
  alignItems: `center`,
});

export const leftWrapper = css({
  minWidth: utils.remConverter(50),
  display: `flex`,
  alignItems: `center`,
  cursor: `pointer`,
  zIndex: 1,
});
export const backImage = css({
  height: `auto`,
});

export const centerWrapper = css({
  flexGrow: 1,
  ...typography.T_20_Bold,
  textAlign: `center`,
  overflow: `hidden`,
});
export const rightWrapper = css({
  minWidth: utils.remConverter(50),
});

export const secondaryBackButtonContainer = css({
  background: colors.Secondary_White,
  boxShadow: colors.Shadow_Btn_P_Outer_Smooth,
  borderRadius: `100%`,
  padding: `${utils.remConverter(6)} ${utils.remConverter(
    10,
  )} ${utils.remConverter(10)} ${utils.remConverter(6)}`,
});
