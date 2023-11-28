import { css } from '@emotion/react';
import { colors, typography, utils } from '@styles/shared';

export const title = css({
  ...typography.T_14_Semibold,
});
export const userDetails = css({
  display: `flex`,
});
export const profileImgContainer = css({
  background: colors.Primary_Yellow,
  borderRadius: `50%`,
  height: utils.remConverter(56),
  width: utils.remConverter(56),
  marginTop: utils.remConverter(8),
  marginRight: utils.remConverter(12),
});
export const userContent = css({
  display: `flex`,
  flexDirection: `column`,
  justifyContent: `center`,
});
