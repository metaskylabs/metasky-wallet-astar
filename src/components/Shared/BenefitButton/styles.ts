import { css } from '@emotion/react';
import { utils } from '@styles/shared';

export const benefitPrimaryButton = css({
  position: `absolute`,
  left: `50%`,
  transform: `translate(-50%)`,
  marginTop: utils.remConverter(-25), //-1.5625rem
});
