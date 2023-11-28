import { css } from '@emotion/react';

export const backgroundArea = css({
  position: `fixed`,
  left: 0,
  right: 0,
  bottom: 0,
  top: 0,
  backgroundColor: `#222B42`,
  display: `flex`,
  justifyContent: `center`,
  alignItems: `center`,
  overflow: `hidden`,
  zIndex: 0,
});

export const modalWrapper = css({
  position: `absolute`,
});
