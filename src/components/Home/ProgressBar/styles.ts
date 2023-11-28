import { colors, typography, utils, mixins } from '@styles/shared';
import { css } from '@emotion/react';

export const progressBarContainer = css([
  mixins.flex,
  {
    gap: utils.remConverter(2),
  },
]);

export const progressBar = css({
  width: `100%`,
  height: utils.remConverter(4),
  background: colors.Grey_Border,
  borderRadius: utils.remConverter(4),
  boxShadow: colors.Shadow_Card_Outer_Sharp2,
  overflow: `hidden`,
});

export const bgBlue = css({ background: colors.Primary_Blue, height: `100%` });
