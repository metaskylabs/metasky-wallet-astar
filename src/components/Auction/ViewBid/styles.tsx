import { css } from '@emotion/react';
import { utils } from '@styles/shared';

export const container = css({
  height: `100%`,
  display: `flex`,
  flexDirection: `column`,
});
export const mainWrapper = css({
  flexGrow: 1,
  justifyContent: `space-between`,
  flexDirection: `column`,
  display: `flex`,
  padding: `${utils.remConverter(26)} ${utils.remConverter(16)}`,
  paddingTop: 0,
});

export const cardWrapper = css({
  marginBottom: utils.remConverter(30),
});

export const divider = css({
  margin: `${utils.remConverter(0)} ${utils.remConverter(0)}`,
});

export const nftInfo = css({
  display: `flex`,
  flexDirection: `column`,
});
