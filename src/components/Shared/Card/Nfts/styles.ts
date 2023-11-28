import { colors, typography, utils } from '@styles/shared';
import { css } from '@emotion/react';
import AssetsImg from '@public/images';
export const card = css({
  flex: 1,
  wordWrap: `break-word`,
  position: `relative`,
  backgroundColor: colors.Primary_Bg_Grey,
  borderRadius: 4,
  overflow: `hidden`,
  boxShadow: colors.Shadow_Card_Outer_Smooth,
  cursor: `pointer`,
  ...typography.T_12_Semibold,
  height: `100%`,
});

export const ribbonWrapper = css({
  position: `absolute`,
  left: `-5px`,
  top: `20px`,
  zIndex: 1,
  paddingLeft: 10,
  paddingRight: 20,
  flex: 1,
  justifyContent: `center`,
  alignItems: `center`,
  padding: `4px 15px 4px 10px`,
  '&:before': {
    content: `""`,
    position: `absolute`,
    height: `5px`,
    width: `4px`,
    top: `-4px`,
    left: 1,
    clipPath: `polygon(100% 0, 0% 100%, 100% 100%)`,
    backgroundColor: colors.Tertiary_Darker_Yellow,
  },
});

export const bannerRect = css({
  position: `absolute`,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  height: `100%`,
  width: `100%`,
});
export const ribbonText = css({
  ...typography.T_12_Semibold,
  position: `relative`,
});

export const cardNftWrapper = css({
  // padding: utils.remConverter(12),
  height: `100%`,
  /** In Safari and IPhone, banner not visible on vedio */
  WebkitTransform: `translate3d(0,0,0)`,
  display: `flex`,
  flexDirection: `column`,
  justifyContent: `space-between`,
});

export const cardNftImage = css({
  height: utils.remConverter(224),
  width: `100%`,
  marginBottom: utils.remConverter(10),
  borderRadius: `${utils.remConverter(4)} ${utils.remConverter(
    4,
  )} ${utils.remConverter(0)} ${utils.remConverter(0)}`,
  objectFit: `contain`,
});

export const cardNftDescriptionContainer = css({
  padding: `0 ${utils.remConverter(12)} ${utils.remConverter(
    8,
  )} ${utils.remConverter(12)}`,
});

export const cardNftDescription = css({
  ...typography.T_14_Bold,
  width: `100%`,
  overflow: `hidden`,
  display: `-webkit-box`,
  WebkitLineClamp: `2`,
  WebkitBoxOrient: `vertical`,
});

export const primaryButton = css({
  ...typography.T_16_Bold,
  width: `100%`,
  height: utils.remConverter(40),
  margin: `${utils.remConverter(10)} 0 ${utils.remConverter(5)} 0`,
});

export const priceContainer = css({
  height: utils.remConverter(41),
  width: `100%`,
  background: colors.Grey_Border,
  borderRadius: utils.remConverter(8),
  margin: `${utils.remConverter(12)} 0`,
  textAlign: `center`,
  color: colors.Secondary_Black_Text,
});

export const mb = css({
  marginBottom: `${utils.remConverter(4)} !important`,
});

export const loader = css({
  width: utils.remConverter(25),
  marginLeft: utils.remConverter(10),
});

export const rarityRanking = css({
  color: colors.Secondary_White,
  padding: `${utils.remConverter(1)} ${utils.remConverter(10)}`,
  ...typography.T_12_Bold,
  position: `absolute`,
  left: `50%`,
  transform: `translate(-50%)`,
  marginTop: utils.remConverter(-13),
  borderRadius: utils.remConverter(46),
});

export const infinityCollectionTitle = css({
  color: colors.Secondary_Black_Text,
  overflow: `hidden`,
  display: `-webkit-box`,
  WebkitLineClamp: `1`,
  WebkitBoxOrient: `vertical`,
  height: utils.remConverter(18),
  ...typography.T_12_Semibold,
});

export const infinityCollectionDescription = css({
  color: colors.Secondary_Black_Text,
  marginBottom: utils.remConverter(9),
  overflow: `hidden`,
  display: `-webkit-box`,
  WebkitLineClamp: `2`,
  WebkitBoxOrient: `vertical`,
  // height: utils.remConverter(40),
  ...typography.T_14_Bold,
});

export const marketplacePrice = css({
  background: colors.Secondary_White,
  color: colors.Secondary_Black_Text,
  padding: utils.remConverter(9),
  ...typography.T_14_Bold,
});

export const noRarityHeight = css({
  height: `50%`,
});

export const rarityHeight = css({
  height: `40%`,
});

export const alignBetween = css({
  height: `100%`,
  justifyContent: `space-between`,
});

export const backButton = css({
  boxShadow: colors.Shadow_Btn_S_Outer_Smooth,
  backgroundColor: colors.Primary_Yellow,
  borderRadius: 20,
  border: 0,
  width: utils.remConverter(25),
  height: utils.remConverter(25),
});

export const blueArrow = css({
  height: utils.remConverter(16),
  width: utils.remConverter(16),
});

export const collectionImage = css({
  borderRadius: 20,
  border: 0,
  width: utils.remConverter(16),
  height: utils.remConverter(16),
});
