import { css } from '@emotion/react';

const utils = {
  ctaContainer: () => {
    return css({
      padding: `0 ${utils.remConverter(16)} ${utils.remConverter(32)}`,
    });
  },
  remConverter: (value: number) => {
    return `${value / 16}rem`;
  },
  height: (value: number) => {
    return css({
      height: utils.remConverter(value),
    });
  },
  width: (value: number) => {
    return css({
      width: utils.remConverter(value),
    });
  },
  heightPercent: (value: number) => {
    return css({
      height: `${value}%`,
    });
  },
  widthPercent: (value: number) => {
    return css({
      width: `${value}%`,
    });
  },
  widthAuto: () => {
    return css({
      width: `auto`,
    });
  },
  padding: (value: number) => {
    return css({
      padding: utils.remConverter(value),
    });
  },
  margin: (value: number) => {
    return css({
      margin: utils.remConverter(value),
    });
  },
  fullWidth: () => {
    return css({
      width: `100%`,
    });
  },
  ml: (value: number) => {
    return css({
      marginLeft: utils.remConverter(value),
    });
  },
  mr: (value: number) => {
    return css({
      marginRight: utils.remConverter(value),
    });
  },
  mt: (value: number) => {
    return css({
      marginTop: utils.remConverter(value),
    });
  },
  mb: (value: number) => {
    return css({
      marginBottom: utils.remConverter(value),
    });
  },
  pl: (value: number) => {
    return css({
      paddingLeft: utils.remConverter(value),
    });
  },
  pr: (value: number) => {
    return css({
      paddingRight: utils.remConverter(value),
    });
  },
  pt: (value: number) => {
    return css({
      paddingTop: utils.remConverter(value),
    });
  },
  pb: (value: number) => {
    return css({
      paddingBottom: utils.remConverter(value),
    });
  },
  ptlbr: (top: number, left: number, bottom: number, right: number) => {
    return css({
      padding: `${utils.remConverter(top)} ${utils.remConverter(
        left,
      )} ${utils.remConverter(bottom)} ${utils.remConverter(right)}`,
    });
  },
};

export default utils;
