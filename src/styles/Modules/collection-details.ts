import { css } from '@emotion/react';
import { colors, mixins, typography, utils } from '../shared';

export const buttonContainer = css({
  padding: `0 ${utils.remConverter(16)}`,
  marginBottom: utils.remConverter(25),
});

export const button = css({
  background: colors.Primary_Yellow,
  boxShadow: colors.Shadow_Btn_P_Outer_Sharp,
  borderRadius: `50px`,
  padding: `12px`,
  width: `100%`,
  border: `0`,
  color: colors.Secondary_Black_Text,
  ...typography.T_16_Bold,
  zIndex: 4,
});

export const headerContainer = css({
  position: `relative`,
});

export const imageWidth = css({
  display: `none`,
  width: `100%`,
  height: `auto`,
  maxHeight: `${utils.remConverter(435)}`,
  objectFit: `contain`,
});

export const backButton = css({
  position: `absolute`,
  top: `0`,
  left: `0`,
  margin: `${utils.remConverter(20)}`,
});

export const bodyContainer = css({
  width: `100%`,
});

export const cardAccessText = css([
  {
    ...typography.T_20_Bold,
    margin: `${utils.remConverter(25)} 0`,
    textAlign: `center`,
  },
  mixins.flexAlignJustifiedCenter,
]);

export const collectionTags = css([
  {
    display: `flex`,
    flexWrap: `wrap`,
    gap: utils.remConverter(12),
    marginTop: utils.remConverter(5),
    marginBottom: utils.remConverter(25),
  },
]);

export const collectionTag = css([
  {
    ...typography.T_12_Regular,
    display: `flex`,
    justifyContent: `center`,
    alignItems: `center`,
    padding: `${utils.remConverter(4)} ${utils.remConverter(12)}`,
    borderRadius: utils.remConverter(50),
    background: colors.Grey_Background,
    gap: utils.remConverter(12),
    boxShadow: colors.Shadow_Btn_P_Outer_Sharp,
  },
]);

export const socialIcon = css([
  {
    width: `40%`,
    height: `40%`,
  },
]);

export const descriptionTitle = css({
  ...typography.T_14_Bold,
  marginBottom: utils.remConverter(4),
});

export const descriptionText = css({
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

export const authorImage = css({
  width: utils.remConverter(19),
  height: utils.remConverter(19),
});

export const descriptionAuthorName = css({
  ...typography.T_16_Bold,
  color: colors.Secondary_Black_Text,
  overflow: `hidden`,
  textOverflow: `ellipsis`,
});

export const nftContainer = css({
  margin: `0 ${utils.remConverter(16)}`,
  marginBottom: utils.remConverter(16),
  display: `flex`,
  flexWrap: `wrap`,
  gap: `16px`,
});

export const nftCardContainer = css({
  width: `calc(50% - 8px)`,
  wordWrap: `break-word`,
});

export const nftCard = css({
  marginLeft: 0,
  marginBottom: 0,
  marginTop: 0,
});

export const nftCardImage = css({
  height: utils.remConverter(178),
});

export const seeAll = css({
  ...typography.T_12_Semibold,
  color: colors.Primary_Blue,
  cursor: `pointer`,
});

export const benefitsText = css({
  ...typography.T_20_Bold,
  marginRight: utils.remConverter(20),
});

export const loginBanner = css({
  background: colors.Primary_Blue,
  margin: `0 ${utils.remConverter(16)} ${utils.remConverter(
    20,
  )} ${utils.remConverter(16)}`,
  borderRadius: utils.remConverter(6),
  padding: `${utils.remConverter(8.5)} ${utils.remConverter(10)}`,
  display: `flex`,
  gap: utils.remConverter(10),
  cursor: `pointer`,
});

export const loginBannerImg = css({
  height: utils.remConverter(20),
  width: utils.remConverter(20),
});

export const loginBannerText = css({
  ...typography.T_14_Semibold,
  color: colors.Primary_Bg_Grey,
});
