import { css } from '@emotion/react';
import { colors, typography, utils } from '@styles/shared';

export const AnnouncementSectionContainer = css({
  marginTop: utils.remConverter(35),
  marginBottom: utils.remConverter(35),
  boxShadow: colors.Shadow_V1,
  marginLeft: utils.remConverter(16),
  marginRight: utils.remConverter(16),
  borderRadius: 4,
  overflow: `hidden`,
  padding: utils.remConverter(20),
  minHeight: utils.remConverter(134.5),
});

export const AnnouncementSectionTitle = css({
  ...typography.T_16_Bold,
  color: colors.Secondary_White,
  width: `100%`,
  wordBreak: `break-all`,
  overflow: `hidden`,
  textOverflow: `ellipsis`,
  display: `-webkit-box`,
  WebkitLineClamp: `1`,
  WebkitBoxOrient: `vertical`,
});

export const AnnouncementSectionContent = css({
  ...typography.T_14_Regular,
  width: `100%`,
  overflow: `hidden`,
  display: `-webkit-box`,
  WebkitLineClamp: `2`,
  WebkitBoxOrient: `vertical`,
});

export const AnnouncementSectionReminder = css({
  ...typography.T_16_Bold,
  color: colors.Secondary_White,
});

export const megaPhone = css({
  width: utils.remConverter(77),
  marginRight: utils.remConverter(20),
});

export const announcementCta = css({
  ...typography.T_12_Semibold,
  display: `flex`,
  alignItems: `center`,
  marginTop: utils.remConverter(7),
  cursor: `pointer`,
});
export const ctaImg = css({
  width: utils.remConverter(12),
  height: utils.remConverter(12),
  marginLeft: utils.remConverter(5),
});
