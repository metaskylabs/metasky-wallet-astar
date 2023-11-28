import { css } from '@emotion/react';
import { colors, mixins } from '@styles/shared';
import { mqMinWidth } from '@styles/shared/mediaQueries';

// export const container = css(
//   [
//     {
//       backgroundColor: colors.Primary_Bg_Grey,
//       maxWidth: 428,
//       height: `var(--appHeight)`,
//       overflowY: `scroll`,
//       margin: `0 auto`,
//       overflowX: `hidden`,
//       position: `relative`,
//       top: 0,
//       zIndex: 2,
//     },
// { ...mixins.desktopHocWrapper },
//   ],
//   `max-height: -moz-available;
//    max-height: -webkit-fill-available;
//    max-height: fill-available;`,
// );

export const container = css({
  backgroundColor: colors.Primary_Bg_Grey,
  height: `var(--appHeight)`,
  width: `100%`,
  zIndex: 15,
  position: `relative`,
  display: `flex`,
  flexDirection: `column`,
  justifyContent: `space-between`,
  overflow: `auto`,
  overflowX: `hidden`,
  borderRadius: `8px`,
  boxShadow: `rgba(0, 0, 0, 0.24) 0px 3px 8px`,
  [mqMinWidth[5]]: {
    ...mixins.desktopHocWrapper,
  },
});
