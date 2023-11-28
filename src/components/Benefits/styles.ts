import { css } from '@emotion/react';
import { colors, typography, utils } from '@styles/shared';

export const benefitsHeader = css({
  padding: `${utils.remConverter(20)} ${utils.remConverter(16)}`,
});

export const benefitsTitle = css({
  ...typography.T_20_Bold,
  width: `75%`,
  textAlign: `center`,
});

export const benefitsContainer = css({
  margin: `${utils.remConverter(16)} ${utils.remConverter(16)}`,
});

export const benefitsFilterWrapper = css({
  margin: `${utils.remConverter(20)} 0`,
  display: `grid`,
  gridTemplateColumns: `repeat(3, 1fr)`,
  gap: utils.remConverter(20),
});

export const benefitsCardWrapper = css({
  marginTop: `${utils.remConverter(20)}`,
  display: `grid`,
  gridTemplateColumns: `repeat(1, 1fr)`,
});

export const benefitsCard = css({
  margin: `-10px 0 0 0`,
  marginLeft: 0,
});

export const loaderContentInfo = css({
  textAlign: `center`,
  color: colors.Secondary_Black_Text,
});
