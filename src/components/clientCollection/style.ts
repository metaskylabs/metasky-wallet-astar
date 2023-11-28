import { css } from '@emotion/react';
import { colors, mixins, typography, utils } from '@styles/shared';

export const imageWidth = css({
  width: `100%`,
  height: `auto`,
  maxHeight: `${utils.remConverter(435)}`,
  objectFit: `contain`,
});

export const descriptionTitle = css({
  ...typography.T_20_Bold,
  marginBottom: utils.remConverter(4),
});

export const descriptionText = css({
  ...typography.T_16_Regular,
  lineHeight: utils.remConverter(26),
  color: colors.Secondary_Black_Text,
  marginBottom: utils.remConverter(20),
});

export const descriptionCreatedBy = css({
  ...typography.T_14_Regular,
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
  ...typography.T_16_Bold,
  color: colors.Secondary_Black_Text,
  overflow: `hidden`,
  textOverflow: `ellipsis`,
});

export const nftContainer = css({
  margin: `0`,
  marginBottom: utils.remConverter(25),
  display: `flex`,
  flexWrap: `wrap`,
  gap: `16px`,
});

export const tncLink = css({
  ...typography.T_14_Bold,
  marginBottom: utils.remConverter(4),
  textAlign: `center`,
  color: colors.Primary_Blue,
  textDecoration: `underline`,
  cursor: `pointer`,
});

export const tncTitle = css({
  ...typography.T_14_Bold,
  marginBottom: utils.remConverter(4),
});

export const nftCardContainer = css({
  width: `calc(50% - 8px)`,
  wordWrap: `break-word`,
});

export const cardAccessText = css([
  {
    ...typography.T_20_Bold,
    marginTop: `${utils.remConverter(24)}`,
    padding: `0 ${utils.remConverter(16)}`,
    textAlign: `center`,
  },
  mixins.flexAlignJustifiedCenter,
]);

export const buttonContainer = css({
  padding: utils.remConverter(16),
  width: `100%`,
});

export const button = css({
  background: colors.Primary_Yellow,
  boxShadow: colors.Shadow_Btn_P_Outer_Sharp,
  borderRadius: `50px`,
  padding: `12px`,
  width: `100%`,
  border: `0`,
  color: colors.Secondary_Black_Text,
  ...typography.T_20_Bold,
  zIndex: 4,
});
