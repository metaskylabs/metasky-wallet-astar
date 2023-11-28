import { css } from '@emotion/react';

export const wrapper = css({
  height: `100%`,
  position: `relative`,
  footer: {
    position: `absolute`,
    bottom: 0,
  },
});

export const buttonComponentLayout = css({
  overflow: `auto`,
  height: `calc(100% - 83px)`,
});

export const buttonlessComponentLayout = css({
  overflow: `auto`,
  height: `calc(100%)`,
});

export const footer = css({
  maxHeight: `100px`,
  width: `100%`,
});

export const articleFullWidth = css({
  height: `100%`,
  overflow: `auto`,
});
