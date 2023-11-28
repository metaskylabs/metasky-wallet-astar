import { css } from '@emotion/react';
import { walletDimension } from '@utils/constants';
import { colors } from '@styles/shared';

export const splashScreenContainer = css({
  background: colors.Primary_Yellow,
  position: `fixed`,
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  zIndex: 30,
});

export const checkAnimation = css({
  height: `auto`,
  maxHeight: `90vh`,
  width: `var(--hocWidth)`,
  position: `absolute`,
  top: `50%`,
  left: `50%`,
  transform: `translate(-50%, -50%)`,
});
