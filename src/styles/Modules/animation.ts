import { css } from '@emotion/react';
import { typography, utils, colors } from '../shared';

export const container = css({
  height: `100%`,
  position: `relative`,
  overflow: `hidden`,
});

export const headerContainer = css({
  flexShrink: 0,
  padding: `${utils.remConverter(20)} ${utils.remConverter(
    16,
  )} ${utils.remConverter(18)}`,
  position: `absolute`,
  top: 0,
});

export const animation = css({ height: `100%` });

export const buttonContainer = css({
  position: `absolute`,
  bottom: 0,
  width: `100%`,
});

export const button = css({
  ...typography.T_16_Bold,
  width: `calc(100% - 2rem)`,
  margin: `1rem`,
});
