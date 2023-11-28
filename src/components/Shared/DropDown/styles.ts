import { css } from '@emotion/react';
import { colors, utils } from '@styles/shared';

export const dropdown = css({
  margin: `${utils.remConverter(20)} ${utils.remConverter(16)}`,
});

export const filterContainer = css({
  margin: `${utils.remConverter(16)} 0px`,
  boxShadow: colors.Shadow_Outer_Dropdown,
  position: `absolute`,
  width: `100%`,
  zIndex: 9,
  background: colors.Secondary_White,
  maxHeight: utils.remConverter(264),
  overflowY: `scroll`,
});
