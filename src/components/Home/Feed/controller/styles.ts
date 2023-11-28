import { colors, typography, utils, mixins } from '@styles/shared';
import { css } from '@emotion/react';

export const controller = css([
  {
    zIndex: 3,
    position: `absolute`,
  },
  mixins.fullSize,
  mixins.flexColumn,
]);

export const navContainer = css([
  {
    zIndex: 4,
  },
  mixins.fullSize,
  mixins.flex,
]);

export const navigationButton = css([
  {
    cursor: `pointer`,
  },
  mixins.fullSize,
]);

export const title = css([
  {
    width: `100%`,
    ...typography.T_20_Semibold,
    color: colors.Secondary_White,
    zIndex: 2,
    cursor: `pointer`,
  },
  utils.padding(16),
]);

export const mute = css({
  position: `absolute`,
  width: utils.remConverter(30),
  height: `auto`,
  right: utils.remConverter(16),
  top: utils.remConverter(16),
  zIndex: 5,
});

export const overlay = css([
  {
    position: `absolute`,
    background: colors.Bottom_Black_Fade,
    zIndex: 1,
    borderRadius: utils.remConverter(4),
  },
  mixins.fullSize,
]);
