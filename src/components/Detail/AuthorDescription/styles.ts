import { colors, typography, utils } from '@styles/shared';
import { css } from '@emotion/react';

export const description = css({
  margin: `${utils.remConverter(15)} 0`,
  padding: `${utils.remConverter(16)} ${utils.remConverter(12)}`,
  background: colors.Secondary_White,
  borderRadius: 4,
});

export const descriptionTitle = css({
  marginBottom: utils.remConverter(4),
});

export const descriptionText = css({
  ...typography.T_14_Regular,
  color: colors.Secondary_Black_Text,
  marginBottom: utils.remConverter(20),
});

export const descriptionCreatedBy = css({
  ...typography.T_14_Bold,
  color: colors.Secondary_Black_Text,
});

export const descriptionAuthor = css({
  display: `flex`,
  alignItems: `center`,
  justifyContent: `flex-start`,
  margin: `${utils.remConverter(10)} 0`,
});

export const descriptionAuthorImage = css({
  height: utils.remConverter(38),
  minWidth: utils.remConverter(38),
  width: utils.remConverter(38),
  marginRight: utils.remConverter(10),
  borderRadius: utils.remConverter(50),
  backgroundColor: colors.Secondary_White,
  boxShadow: colors.Shadow_Circle_Sharp,
});

export const descriptionAuthorName = css({
  ...typography.T_16_Regular,
  color: colors.Secondary_Black_Text,
  overflow: `hidden`,
  textOverflow: `ellipsis`,
});

export const authorImage = css({
  width: utils.remConverter(19),
  height: utils.remConverter(19),
});
