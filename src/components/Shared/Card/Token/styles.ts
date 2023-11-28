import { colors, typography, utils } from '@styles/shared';
import { css } from '@emotion/react';

export const tokenContainer = css({
  backgroundColor: colors.Primary_Bg_Grey,
  boxShadow: colors.Shadow_Card_Outer_Smooth,
  borderRadius: 10,
  marginBottom: `${utils.remConverter(20)}`,
});

export const tokenBody = css({
  width: `70vw`,
});

export const tokenImg = css({
  height: `100%`,
  maxWidth: utils.remConverter(80),
  borderRadius: `${utils.remConverter(4)} 0 0 ${utils.remConverter(4)}`,
  background: colors.Secondary_White,
  '& > span': {
    height: `100% !important`,
    width: `100% !important`,
    filter: `drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))`,
    borderRadius: `${utils.remConverter(4)} 0 0 ${utils.remConverter(4)}`,
  },
});

export const tokenCardBottom = css({
  alignItems: `end`,
  padding: `${utils.remConverter(15)}`,
  width: `30vw`,
});

export const tokenTitle = css({
  marginLeft: `${utils.remConverter(12)}`,
  color: colors.Secondary_Black_Text,
  ...typography.T_16_Bold,
});

export const headerContainerTitle = css({
  ...typography.T_20_Bold,
});

export const headerContainerSubTitle = css({
  ...typography.T_12_Semibold,
  color: colors.Secondary_Black_Text,
});

export const inrValue = css({
  ...typography.T_12_Regular,
});
