import { colors, typography, utils } from '@styles/shared';
import { css } from '@emotion/react';

export const pins = css({
  display: `flex`,
  justifyContent: `space-between`,
});

export const focused = css({
  outlineColor: colors.Primary_Blue,
});

export const invalidPins = css({
  border: `1px solid ${colors.Tertiary_Red}`,
  borderRadius: utils.remConverter(10),
});

export const successPins = css({
  border: `1px solid ${colors.Tertiary_Green}`,
  borderRadius: utils.remConverter(10),
});

export const pinWidth = css({
  width: `100%`,
});
