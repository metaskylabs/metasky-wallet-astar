import { colors, typography, utils } from '@styles/shared';
import { css } from '@emotion/react';
import { mq, mqMinWidth } from '@styles/shared/mediaQueries';

export const propertiesContent = css({
  borderRadius: 4,
  backgroundColor: colors.Secondary_White,
  padding: `${utils.remConverter(14)} ${utils.remConverter(18.5)}`,
  textAlign: `center`,
  height: `100%`,
  display: `flex`,
  flexDirection: `column`,
  justifyContent: `space-around`,
});

export const propertiesContentTitle = css({
  ...typography.T_12_Light,
  color: colors.Secondary_Black_Text,
  marginTop: utils.remConverter(14),
  marginBottom: utils.remConverter(4),
});

export const propertiesContentSubTitle = css({
  ...typography.T_14_Bold,
  color: colors.Secondary_Black_Text,
  marginBottom: utils.remConverter(4),
  [mq[0]]: {
    ...typography.T_12_Bold,
  },
});

export const propertiesContentBlock = css({
  marginTop: utils.remConverter(4),
  '&>span': {
    ...typography.T_12_Light,
    color: colors.Secondary_Black_Text,
    paddingTop: utils.remConverter(8),
  },
});

export const gradientBackground = css({
  padding: utils.remConverter(1),
  borderRadius: 4,
  background: `linear-gradient(rgba(72, 133, 218, 1) 100%, rgba(72, 49, 193, 1) 100%)`,
});
