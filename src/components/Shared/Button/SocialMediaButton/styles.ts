import { colors, utils } from '@styles/shared';
import { css } from '@emotion/react';

export const linksContainer = css({
  height: utils.remConverter(50),
  width: utils.remConverter(50),
  borderRadius: 50,
  border: 0,
  backgroundColor: colors.Secondary_White,
  boxShadow: colors.Shadow_Circle_Sharp2,
  padding: utils.remConverter(12),
});

export const linkWrapper = css({
  position: `relative`,
});

export const linksNotification = css({
  height: utils.remConverter(12),
  width: utils.remConverter(12),
  borderRadius: `100%`,
  backgroundColor: colors.Primary_Blue,
  marginTop: utils.remConverter(2),
  position: `absolute`,
  top: 0,
  right: `10%`,
});
