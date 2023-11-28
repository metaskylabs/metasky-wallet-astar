import { colors, typography, utils } from '@/styles/shared';
import { css } from '@emotion/react';

export const tokenInformation = css({
  boxShadow: colors.Shadow_Info_Inner_Smooth,
  borderRadius: 4,
  backgroundColor: colors.Primary_Bg_Grey,
  height: utils.remConverter(70),
  margin: `${utils.remConverter(15)} ${utils.remConverter(16)}`,
});

export const tokenInfoContainer = css({
  alignItems: `center`,
  width: `50%`,
  '& > span': {
    ...typography.T_20_Bold,
  },
  '& > small': {
    ...typography.T_16_Regular,
  },
});

export const tokenInfo = css({
  width: `100%`,
  alignItems: `center`,
  '& > span': {
    ...typography.T_20_Bold,
  },
  '& > small': {
    ...typography.T_16_Regular,
  },
});

export const tokenVerticalLine = css({
  height: `100%`,
  opacity: 0.7,
  transform: `rotate(180deg)`,
  border: `${utils.remConverter(1)} solid ${colors.Grey_Border}`,
});
