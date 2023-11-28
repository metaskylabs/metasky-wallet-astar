import { css } from '@emotion/react';
import { colors, mixins, utils } from '@styles/shared';
import { Autoplay } from 'swiper';

export const headerProfileContainer = css([
  {
    height: utils.remConverter(28),
    width: utils.remConverter(28),
    borderRadius: 50,
    boxShadow: colors.Shadow_Btn_P_Outer_Smooth,
    backgroundColor: colors.Secondary_White,
    cursor: `pointer`,
  },
  ,
  mixins.flexAlignJustifiedCenter,
]);

export const icon = css({
  //   width: utils.remConverter(4.08),
  //   height: `auto`,
});
