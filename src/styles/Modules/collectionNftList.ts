import { css } from '@emotion/react';
import { colors, mixins, typography, utils } from '../shared';

export const nftContainer = css({
  margin: `0 ${utils.remConverter(16)}`,
  marginBottom: utils.remConverter(16),
  display: `flex`,
  flexWrap: `wrap`,
  gap: `16px`,
});

export const nftCardContainer = css({
  width: `calc(50% - 8px)`,
  wordWrap: `break-word`,
});

export const nftCard = css({
  marginLeft: 0,
  marginBottom: 0,
  marginTop: 0,
});

export const nftCardImage = css({
  height: utils.remConverter(178),
});

export const loadMoreContainer = css({
  display: `flex`,
  justifyContent: `center`,
  marginBottom: utils.remConverter(16),
  padding: `0 ${utils.remConverter(16)}`,
});

export const loadMoreButton = css({
  ...typography.T_14_Bold,
  padding: `0 ${utils.remConverter(15)}`,
  width: `100%`,
  margin: `0`,
  borderRadius: 4,
});

export const loaderContentInfo = css({
  textAlign: `center`,
  color: colors.Secondary_Black_Text,
});

export const emptyCollectionContainer = css({
  display: `grid`,
  height: `100%`,
  width: `100%`,
  position: `absolute`,
  zIndex: 1,
});
