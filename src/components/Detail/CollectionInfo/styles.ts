import { colors, typography, utils } from '@styles/shared';
import { css } from '@emotion/react';

export const collection = css({
  display: `flex`,
  margin: `${utils.remConverter(20)} 0 ${utils.remConverter(40)} 0`,
  background: colors.Secondary_White,
  borderRadius: 4,
  padding: `${utils.remConverter(10)} ${utils.remConverter(12)}`,
});

export const collectionAvatar = css({
  marginRight: utils.remConverter(12),
  '& > span': {
    width: `100vw !important`,
    height: `auto !important`,
    borderRadius: `50%`,
  },
  '&>img': {
    width: utils.remConverter(48),
    height: utils.remConverter(48),
    borderRadius: `50%`,
  },
});

export const collectionTitleText = css({
  ...typography.T_16_Bold,
  color: colors.Primary_Blue,
});

export const collectionVerifiedIcon = css({
  display: `flex`,
  marginLeft: utils.remConverter(5),
});

export const collectionDescription = css({
  ...typography.T_14_Regular,
  color: colors.Secondary_Black_Text,
});

export const collectionReadMore = css({
  ...typography.T_12_Semibold,
  color: colors.Primary_Blue,
});

export const authorDescriptionWrapper = css({
  marginTop: utils.remConverter(12),
});
