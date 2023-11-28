import { css } from '@emotion/react';
import { colors, typography } from '@styles/shared';
import utils from '@styles/shared/utils';

export const headerContainer = css({
  paddingBottom: utils.remConverter(33),
  backgroundColor: colors.Primary_Bg_Grey,
  borderRadius: `${utils.remConverter(0)} ${utils.remConverter(
    0,
  )} ${utils.remConverter(20)} ${utils.remConverter(20)}`,
  boxShadow: colors.Shadow_Bg_Outer_Sharp,
});
export const bodyBlur = css({
  filter: `blur(10px)`,
  margin: `0`,
  height: `100%`,
  overflow: `hidden`,
});

export const walletBtnWrapper = css({
  padding: `${utils.remConverter(0)} ${utils.remConverter(16)}`,
});

export const benefitsTextWrapper = css({
  padding: `${utils.remConverter(20)} ${utils.remConverter(
    16,
  )} ${utils.remConverter(16)} ${utils.remConverter(16)}`,
});

export const headerSwiper = css({
  '& > .swiper-wrapper > .swiper-slide-active': {
    transform: `scale(1.1)`,
  },
  '& > .swiper-wrapper > .swiper-slide-next': {
    transform: `scale(0.9)`,
  },
});

export const header = css({
  borderRadius: `${utils.remConverter(0)} ${utils.remConverter(
    0,
  )} ${utils.remConverter(15)} ${utils.remConverter(20)}`,
  backgroundColor: colors.Secondary_White,
  padding: `${utils.remConverter(20)} ${utils.remConverter(16)}`,
});

export const mr = css({
  marginRight: `${utils.remConverter(12)}`,
});

export const headerContainerTitle = css({
  ...typography.T_20_Bold,
  color: colors.Secondary_Black_Text,
});

export const nftCardWrapper = css({
  padding: `0 ${utils.remConverter(16)}`,
});

export const headerContainerSubTitle = css({
  ...typography.T_14_Regular,
  color: colors.Secondary_Black_Text,
});

export const contactSupport = css({
  ...typography.T_14_Semibold,
  color: colors.Primary_Blue,
  marginBottom: 0,
  marginLeft: utils.remConverter(5),
});

export const tokenList = css({
  padding: `${utils.remConverter(0)} ${utils.remConverter(16)}`,
});

export const homeBottomWrapper = css({
  boxShadow: colors.Shadow_Btn_Box,
  backgroundColor: colors.Secondary_White,
  position: `absolute`,
  bottom: 0,
  zIndex: 2,
});

export const refreshFund = css({
  ...typography.T_14_Bold,
  width: `50%`,
  height: utils.remConverter(54),
  margin: utils.remConverter(16),
});

export const walletLogout = css({
  ...typography.T_14_Bold,
  width: `50%`,
  height: utils.remConverter(54),
  margin: `${utils.remConverter(16)} ${utils.remConverter(
    16,
  )} ${utils.remConverter(16)} 0`,
  color: colors.Secondary_Black_Text,
});

export const cardNFTImage = css({
  width: utils.remConverter(200),
});

export const cardMB = css({
  marginBottom: utils.remConverter(40),
});

export const TransButtonAdded = css({
  width: `100%`,
  color: colors.Secondary_Black_Text,
});

export const homeMB = css({
  marginBottom: utils.remConverter(100),
});

export const loaderContainer = css({
  height: `100%`,
  zIndex: `10`,
});

export const defaultCardMb = css({
  marginBottom: utils.remConverter(20),
});

export const announcementImg = css({
  width: `100%`,
  height: `100%`,
  padding: `${utils.remConverter(20)} ${utils.remConverter(16)}`,
  marginBottom: utils.remConverter(12),
});

export const logoutBottomSheet = css({
  padding: `0px`,
});

export const seeAll = css({
  ...typography.T_12_Semibold,
  color: colors.Primary_Blue,
});

//s V2 new page style
export const feedSection = css({
  marginTop: utils.remConverter(15),
  marginBottom: utils.remConverter(24),
  padding: `0 ${utils.remConverter(16)}`,
});
