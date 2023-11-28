import { css } from '@emotion/react';
import { typography, utils } from '@styles/shared';

export const richWrapper = css({
  paddingBottom: utils.remConverter(20),
  '.ql-size-large, h2': {
    ...typography.T_16_Regular,
  },
  '.ql-size-huge, h1': {
    ...typography.T_20_Regular,
  },
  '.ql-size-small, p, h3, h4, h5': {
    ...typography.T_12_Regular,
  },
  strong: {
    fontWeight: `bolder !important`,
  },
  img: {
    width: `100%`,
    height: `auto`,
    objectFit: `contain`,
    maxHeight: utils.remConverter(150),
  },
});
