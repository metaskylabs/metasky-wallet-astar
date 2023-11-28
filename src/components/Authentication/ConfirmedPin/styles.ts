import { colors, typography, utils } from '@styles/shared';
import { css } from '@emotion/react';

export const textCenter = css({
  textAlign: `center`,
  margin: `${utils.remConverter(60)} 0`,
  width: `100%`,
});

export const iconContainer = css({
  width: `100%`,
  height: `142px`,
});

export const icon = css({
  width: utils.remConverter(143),
  height: utils.remConverter(143),
  background: colors.Grey_Border,
  display: `flex`,
  borderRadius: `50%`,
  alignItems: `center`,
  WebkitJustifyContent: `center`,
  margin: `0 auto`,
  marginBottom: utils.remConverter(40),
});

export const title = css({
  color: colors.Secondary_Black_Text,
  ...typography.T_20_Bold,
});

export const text = css({
  margin: `${utils.remConverter(20)} 0 ${utils.remConverter(50)}`,
  color: colors.Grey_Text,
  ...typography.T_16_Regular,
  padding: `0 ${utils.remConverter(30)}`,
});

export const btnWidth = css({
  width: `100%`,
});
