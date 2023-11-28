import { css } from '@emotion/react';
import { colors, mixins, typography, utils } from '@styles/shared';

export const close = css({
  ...typography.T_14_Bold,
  color: colors.Primary_Blue,
  cursor: `pointer`,
});
export const mainWrapper = css({
  padding: `0 ${utils.remConverter(16)} ${utils.remConverter(16)} `,
});

export const container = css({
  padding: `0 ${utils.remConverter(16)}`,
});
export const mediaContainer = css(
  {
    width: `100%`,
    height: utils.remConverter(658),
    borderRadius: utils.remConverter(4),
    overflow: `hidden`,
    position: `relative`,
    background: colors.Secondary_Black_Text,
  },
  [mixins.flexAlignCenter],
);

export const heading = css({
  marginBottom: utils.remConverter(32),
});

export const mute = css({
  position: `absolute`,
  width: utils.remConverter(30),
  height: `auto`,
  right: utils.remConverter(16),
  top: utils.remConverter(16),
  zIndex: 3,
});

export const title = css([
  {
    position: `absolute`,
    width: `100%`,
    ...typography.T_20_Semibold,
    color: colors.Secondary_White,
    zIndex: 2,
    bottom: 0,
    background: colors.Feed_Title_Mask,
  },
  utils.padding(16),
]);

export const markdownDescription = css([
  {
    ...typography.T_16_Regular,
    img: [
      {
        width: `100%`,
        height: `auto`,
      },
      utils.mt(16),
      utils.mb(16),
    ],
  },
  utils.mt(16),
]);

export const loaderContentInfo = css({
  textAlign: `center`,
  color: colors.Secondary_Black_Text,
});
