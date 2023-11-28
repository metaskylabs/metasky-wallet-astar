import { css } from '@emotion/react';

export const tooltip = css({
  position: `relative`,
  display: `flex`,
  cursor: `pointer`,
});

export const tooltipText = css({
  visibility: `visible`,
  width: `120px`,
  backgroundColor: `#555`,
  color: `#fff`,
  textAlign: `center`,
  borderRadius: `6px`,
  padding: `5px 0`,
  position: `absolute`,
  bottom: `125%`,
  left: `50%`,
  marginLeft: `-60px`,
  opacity: 0,
  transition: `opacity 0.3s`,
  '&:after': {
    content: `""`,
    position: `absolute`,
    top: `100%`,
    left: `50%`,
    marginLeft: `-5px`,
    borderWidth: `5px`,
    borderstyle: `solid`,
    borderColor: `#555 transparent transparent transparent`,
  },
});

export const tooltipVisibility = css({
  visibility: `visible`,
  opacity: 1,
});
