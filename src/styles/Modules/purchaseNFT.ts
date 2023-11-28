import { css } from '@emotion/react';
import { mq } from '@styles/shared/mediaQueries';
import { colors, mixins, typography, utils } from '../shared';

export const headerContainer = css({
  position: `relative`,
});

export const primaryButton = css({
  position: `absolute`,
  left: `50%`,
  transform: `translate(-50%)`,
  marginTop: utils.remConverter(-25), //-1.5625rem
});

export const backButton = css({
  position: `absolute`,
  top: `0`,
  left: `0`,
  margin: `${utils.remConverter(20)}`,
});

export const audioControls = css({
  width: `100%`,
  margin: utils.remConverter(10),
  borderRadius: `${utils.remConverter(10)}`,
});

export const bodyContainer = css({
  width: `100%`,
  padding: `0 ${utils.remConverter(10)}`,
  [mq[0]]: {
    paddingBottom: utils.remConverter(100),
  },
  overflowX: `hidden`,
});

export const seeAll = css({
  ...typography.T_12_Semibold,
  color: colors.Primary_Blue,
  cursor: `pointer`,
});

export const cardAccessText = css({
  ...typography.T_20_Bold,
  margin: `${utils.remConverter(25)} 0`,
  textAlign: `center`,
});

export const transactionValidity = css({
  marginTop: utils.remConverter(24),
  backgroundColor: colors.Secondary_White,
  padding: utils.remConverter(12),
  borderRadius: 10,
});

export const transactionValidityText = css({
  ...typography.T_14_Regular,
  color: colors.Secondary_Black_Text,
  margin: 0,
});

export const transactionInfoStyles = css({
  margin: `${utils.remConverter(20)} 0 ${utils.remConverter(30)} 0`,
});

export const transactionValiditySec = css({
  ...typography.T_14_Bold,
  color: colors.Secondary_Black_Text,
});

export const divider = css({
  border: `${utils.remConverter(1)} solid ${colors.Grey_Border}`,
});

export const cardBenefits = css({
  margin: `${utils.remConverter(5)} 0`,
});

export const benefitsText = css({
  ...typography.T_20_Bold,
  marginRight: utils.remConverter(20),
});

export const purchaseRankingChip = css({
  background: colors.Rarirty_Background_Mid,
  display: `flex`,
  padding: `0 ${utils.remConverter(8)}`,
  borderRadius: 25,
});

export const purchaseRankingText = css({
  ...typography.T_12_Semibold,
  color: colors.Secondary_White,
});

export const benefitsCard = css({
  position: `relative`,
});

export const propertiesHeader = css({
  margin: `${utils.remConverter(20)} 0`,
});

export const propertiesBody = css({
  marginBottom: utils.remConverter(20),
  display: `grid`,
  gridTemplateColumns: `repeat(2, 1fr)`,
  gap: utils.remConverter(10),
});

export const propertiesArrow = css({
  cursor: `pointer`,
});

export const cardGrid = css({
  margin: `${utils.remConverter(20)} ${utils.remConverter(16)}`,
  display: `grid`,
  gridTemplateColumns: `repeat(2, 1fr)`,
  gap: utils.remConverter(15),
  '& > div': {
    height: utils.remConverter(240),
    width: `auto`,
    marginLeft: 0,
    marginBottom: 0,
  },
  '& > div > div > div': {
    height: utils.remConverter(152),
  },
});

export const bodyTokenTitle = css({
  ...typography.T_20_Bold,
  color: colors.Secondary_Black_Text,
});

export const token = css({
  margin: `${utils.remConverter(5)} 0`,
});

export const nftCard = css({
  margin: `${utils.remConverter(25)} 0`,
});

export const links = css({
  margin: `${utils.remConverter(10)} 0`,
});

export const shareNftContainer = css([
  {
    boxShadow: colors.Shadow_Btn_Box,
    backgroundColor: colors.Secondary_White,
    position: `sticky`,
    bottom: 0,
    zIndex: 10,
    width: `var(--hocWidth)`,
  },
]);

export const filterReset = css({
  ...typography.T_16_Bold,
  width: `50%`,
  margin: utils.remConverter(16),
});

export const filterApply = css({
  ...typography.T_16_Bold,
  width: `100%`,
  margin: `${utils.remConverter(16)}`,
});

export const imageWidth = css({
  display: `none`,
  width: `100%`,
  height: `auto`,
  maxHeight: `${utils.remConverter(435)}`,
  objectFit: `contain`,
});

export const loader = css({
  width: utils.remConverter(40),
  margin: utils.remConverter(20),
});

export const loaderContentInfo = css({
  textAlign: `center`,
  color: colors.Secondary_Black_Text,
});

export const logoutBottomSheet = css({
  padding: `0px`,
});

export const padding = css({
  padding: `${utils.remConverter(0)} ${utils.remConverter(16)}`,
});

export const collectionCard = css({
  padding: utils.remConverter(10),
  background: colors.Secondary_White,
  display: `flex`,
  alignItems: `flex-start`,
  gap: utils.remConverter(12),
  margin: `${utils.remConverter(16)} 0`,
  cursor: `pointer`,
});

export const collectionImg = css({
  width: utils.remConverter(48),
  height: utils.remConverter(48),
  borderRadius: `100%`,
});

export const collectionName = css({
  ...typography.T_16_Bold,
  color: colors.Primary_Blue,
});

export const collectionDescription = css({
  ...typography.T_14_Regular,
  color: colors.Secondary_Black_Text,
  overflow: `hidden`,
  display: `-webkit-box`,
  WebkitLineClamp: `3`,
  WebkitBoxOrient: `vertical`,
});

export const nftCardImage = css({
  height: utils.remConverter(178),
});

export const horizontalList = css({
  display: `flex`,
  flexWrap: `wrap`,
  backgroundColor: `transparent`,
  gap: utils.remConverter(12),
});

export const nftCardContainer = css({
  minWidth: `calc(50% - 8px)`,
  maxWidth: `calc(50% - 8px)`,
  wordWrap: `break-word`,
  margin: `${utils.remConverter(16)} 0`,
});

export const searchInput = css([
  {
    ...typography.T_16_Regular,
    backgroundColor: colors.Primary_Bg_Grey,
    boxShadow: colors.Shadow_Input_Inner_Smooth,
    borderRadius: 4,
    WebkitAppearance: `none`,
    border: `none`,
    width: `100%`,
    padding: `${utils.remConverter(16)}`,
    paddingRight: utils.remConverter(38),
    resize: `none`,
    '&: focus': {
      outline: `none`,
    },
    '&:disabled': {
      opacity: 0.67,
    },
  },
  { ...mixins.placeholderTextstyle },
]);

export const dataContainer = css({
  display: `flex`,
  flexDirection: `column`,
  gap: `1rem`,
  width: `calc(100% - ${utils.remConverter(13 * 2)})`,
  margin: `1.5rem ${utils.remConverter(13)}`,
});

export const label = css({
  ...typography.T_14_Bold,
});

export const error = css({
  ...typography.T_14_Regular,
  color: colors.Tertiary_Red,
  display: `flex`,
  width: `100%`,
  justifyContent: `flex-end`,
  marginTop: utils.remConverter(8),
});

export const subtitle = css({
  ...typography.T_16_Regular,
  marginLeft: `1rem`,
});

export const inputContainer = css([
  {
    backgroundColor: colors.Primary_Bg_Grey,
    boxShadow: colors.Shadow_Input_Inner_Smooth,
    borderRadius: 4,
    width: `100%`,
    padding: `${utils.remConverter(16)}`,
    display: `flex`,
    justifyContent: `space-between`,
  },
]);

export const input = css([
  {
    ...typography.T_16_Regular,
    backgroundColor: colors.Primary_Bg_Grey,
    WebkitAppearance: `none`,
    border: `none`,
    paddingRight: utils.remConverter(38),
    resize: `none`,
    '&: focus': {
      outline: `none`,
    },
    '&:disabled': {
      opacity: 0.67,
    },
  },
  { ...mixins.placeholderTextstyle },
]);

export const chip = css({
  ...typography.T_14_Regular,
  color: colors.Ribbon_Blue,
  lineHeight: 1,
  cursor: `pointer`,
  padding: `${utils.remConverter(2)} ${utils.remConverter(16)}`,
});
