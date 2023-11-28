import { colors } from '@/styles/shared';
import { css } from '@emotion/react';

export const sidebar = css({
  width: `100%`,
  minHeight: `100%`,
  position: `absolute`,
  top: `0`,
  left: `-100%`,
  zIndex: 9,
  transition: `0.5s`,
  backgroundColor: colors.Primary_Bg_Grey,
});

export const sidebarActive = css({
  left: `0`,
});

export const sidebarOverlayActive = css({
  opacity: 1,
  visibility: `visible`,
  transition: `all 300ms ease-in-out`,
});

export const sidebarOverlay = css({
  position: `absolute`,
  top: `0`,
  right: `0`,
  left: `0`,
  bottom: `0`,
  width: `100%`,
  height: `100%`,
  backgroundColor: `rgba(0, 0, 0, 0.6)`,
  backdropFilter: `blur(5px)`,
  opacity: 0,
  visibility: `hidden`,
  transition: `0.5s`,
  zIndex: 4,
});

export const closeBtn = css({
  position: `absolute`,
  top: `27px`,
  right: `19px`,
  cursor: `pointer`,
});
