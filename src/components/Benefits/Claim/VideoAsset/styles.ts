import { css } from '@emotion/react';
import { utils } from '@styles/shared';

export const assetWrapper = css({
  overflow: `hidden`,
  borderRadius: 4,
});

export const benefitName = css({
  marginTop: utils.remConverter(24),
  display: `flex`,
  justifyContent: `center`,
});
