import { colors, typography, utils, mixins } from '@styles/shared';
import { css } from '@emotion/react';

export const shimmerContainer = css({ borderRadius: utils.remConverter(4) }, [
  utils.padding(16),
  utils.mt(24),
  utils.mb(20),
]);

export const navButtonsContainer = css([
  { gap: utils.remConverter(12) },
  mixins.flexAlignJustifiedCenter,
]);

export const swiperWrapper = css({
  width: `100%`,
  height: utils.remConverter(658),
  overflow: `hidden`,
});

export const feedContainer = css({
  width: `100%`,
  height: utils.remConverter(658),
  borderRadius: utils.remConverter(4),
  overflow: `hidden`,
  position: `relative`,
  background: colors.Secondary_Black_Text,
});

export const mediaContainer = css([
  mixins.flexAlignJustifiedCenter,
  {
    position: `absolute`,
    margin: `auto`,
    width: `100%`,
    height: `100%`,
    background: colors.Secondary_Black_Text,
  },
]);

export const videoContainer = css({
  width: `100%`,
  height: `auto`,
});
export const container = css([
  {
    width: `100%`,
    height: `100%`,
  },
  mixins.flexAlignJustifiedCenter,
]);
export const layout = css({
  display: `none`,
  width: `100%`,
  height: `auto`,
  maxHeight: `${utils.remConverter(435)}`,
  objectFit: `contain`,
});

export const dummyContainer = css({
  marginBottom: utils.remConverter(12),
  height: utils.remConverter(4),
});

export const loaderContainer = css([
  {
    position: `absolute`,
    width: `100%`,
    height: `100%`,
  },
  mixins.flexAlignJustifiedCenter,
]);

export const swiperContainer = css({
  width: `100%`,
  height: `100%`,
});

export const progressContainer = css({
  background: colors.Primary_Blue,
});
