import { css } from '@emotion/react';
import { colors, typography, utils } from '../shared';
import { mixins } from '@styles/shared';

export const headerContainer = css({
  position: `relative`,
});

export const buttonWrapper = css({
  width: `var(--hocWidth)`,
});

export const primaryButton = css({
  position: `absolute`,
  left: `50%`,
  transform: `translate(-50%)`,
  marginTop: utils.remConverter(-25),
});

export const viewNftLinkOnSale = css({
  color: colors.Primary_Yellow,
  margin: `0 10px`,
  cursor: `pointer`,
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
});

export const cardAccessText = css({
  ...typography.T_20_Bold,
  margin: `${utils.remConverter(24)} 0`,
  textAlign: `center`,
});

export const tokenInformationContainer = css({
  margin: `${utils.remConverter(24)} 0`,
  padding: `${utils.remConverter(0)} ${utils.remConverter(16)}`,
});

export const divider = css({
  border: `${utils.remConverter(1)} solid ${colors.Grey_Border}`,
});

export const cardBenefits = css({
  padding: `${utils.remConverter(20)} 0`,
  backgroundColor: colors.Secondary_White,
});

export const benefitsText = css({
  ...typography.T_20_Bold,
});

export const benefitsCard = css({
  position: `relative`,
});

export const propertiesHeader = css({
  margin: `${utils.remConverter(20)} 0`,
});

export const propertiesBody = css({
  margin: `0 ${utils.remConverter(16)} ${utils.remConverter(
    20,
  )} ${utils.remConverter(16)}`,
  display: `grid`,
  gridTemplateColumns: `repeat(2, 1fr)`,
  gap: utils.remConverter(12),
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

export const padding = css({
  padding: `${utils.remConverter(0)} ${utils.remConverter(16)}`,
});

export const loader = css({
  position: `absolute`,
  top: `40%`,
  left: `50%`,
  transform: `translateX(-15px)`,
});

export const loaderContentInfo = css({
  textAlign: `center`,
  color: colors.Secondary_Black_Text,
});

export const buttonContainer = css([
  {
    padding: utils.remConverter(16),
    background: `#F0F0F3`,
    borderTop: `1px solid ${colors.Grey_Border}`,
    position: `fixed`,
    bottom: `0`,
    width: `var(--hocWidth)`,
    zIndex: 10,
  },
]);

export const button = css({
  background: colors.Primary_Yellow,
  boxShadow: colors.Shadow_Btn_P_Outer_Sharp,
  borderRadius: `50px`,
  padding: `12px`,
  width: `100%`,
  border: `0`,
  color: colors.Secondary_Black_Text,
  ...typography.T_20_Bold,
});

export const bottomSheetStyle = css({
  height: `100%`,
  display: `flex`,
  alignItems: `center`,
  justifyContent: `center`,
  borderRadius: 0,
  padding: `0px`,
  background: `#fee892`,
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

export const nftListingBanner = css({
  height: utils.remConverter(86),
  backgroundColor: colors.Tertiary_Blue,
  boxShadow: colors.Shadow_Outer_Dropdown,
  color: colors.Secondary_White,
  textAlign: `center`,
  zIndex: 4,
  borderRadius: 4,
  margin: `0 ${utils.remConverter(16)} ${utils.remConverter(40)}`,
});

export const nftPendingBanner = css({
  height: utils.remConverter(86),
  backgroundColor: colors.Primary_Blue,
  boxShadow: colors.Shadow_Outer_Dropdown,
  color: colors.Secondary_White,
  padding: `${0} ${utils.remConverter(12)}`,
  cursor: `pointer`,
  borderRadius: 4,
  margin: `0 ${utils.remConverter(16)} ${utils.remConverter(40)}`,
});

export const nftListingTransactionLink = css({
  color: colors.Primary_Yellow,
  cursor: `pointer`,
});

export const filterApply = css({
  ...typography.T_16_Bold,
  width: `50%`,
  margin: `${utils.remConverter(16)}`,
});

export const viewOfferButton = css({
  ...typography.T_16_Bold,
  width: `100%`,
  margin: `${utils.remConverter(16)}`,
});

export const listIcon = css({
  width: utils.remConverter(42),
  height: utils.remConverter(42),
  marginRight: utils.remConverter(15),
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

export const makeOfferButton = css({
  ...typography.T_16_Bold,
  width: `100%`,
  margin: `${utils.remConverter(16)}`,
});

export const toastLink = css({
  border: 0,
  background: `none`,
  color: colors.Secondary_White,
  textDecoration: `underline`,
  padding: `0 ${utils.remConverter(5)}`,
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

export const offerContainer = css({
  margin: `0 ${utils.remConverter(16)} ${utils.remConverter(40)}`,
});

export const ctaContainer = css({
  ...mixins.flexAlignJustifiedCenter,
  marginBottom: utils.remConverter(40),
});
