import { colors, typography, utils } from '@styles/shared';
import { css } from '@emotion/react';

export const tabContainer = css({
  width: `50%`,
  textAlign: `center`,
  borderBottom: `2px solid ${colors.Grey_Border}`,
  padding: utils.remConverter(8),
  cursor: `pointer`,
});

export const tabContent = css({
  ...typography.T_16_Semibold,
  color: colors.Grey_Text,
});

export const tabActiveContainer = css({
  borderBottom: `2px solid ${colors.Primary_Blue}`,
});

export const tabActiveContent = css({
  color: colors.Primary_Blue,
});

export const transferBtnWrapper = css({
  padding: `0 ${utils.remConverter(16)} ${utils.remConverter(32)}`,
});

export const buttonLayoutHeight = css({
  height: `calc(100% - ${utils.remConverter(42)})`,
});

export const transferBtn = css({
  width: `100%`,
});

export const loader = css({
  width: utils.remConverter(25),
  margin: `0 auto`,
});

export const typeContainer = css({
  margin: `${utils.remConverter(40)} 0 ${utils.remConverter(24)} 0`,
});

export const selectType = css({
  color: colors.Grey_Text,
  ...typography.T_14_Semibold,
  marginRight: utils.remConverter(5),
  whiteSpace: `nowrap`,
});

export const label = css({
  ...typography.T_14_Regular,
});

export const labelActive = css({
  color: colors.Primary_Blue,
});

export const addressWrapper = css({
  padding: `0 ${utils.remConverter(18)} ${utils.remConverter(18)}`,
});
