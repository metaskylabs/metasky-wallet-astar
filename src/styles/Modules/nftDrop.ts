import { btnWidth } from '@components/Authentication/ConfirmedPin/styles';
import { flexItem } from '@components/Authentication/LoginWithMetamask/styles';
import { css } from '@emotion/react';
import { withCoalescedInvoke } from 'next/dist/lib/coalesced-function';
import { colors, typography, utils } from '../shared';

export const headerContainer = css({
  position: `relative`,
});

export const imageContainer = css({
  height: `30%`,
  width: `100%`,
  borderRadius: 10,
  '& > span': {
    width: `100% !important`,
    height: `100% !important`,
  },
});

export const countDown = css({
  position: `absolute`,
  left: `50%`,
  bottom: -25,
  transform: `translateX(-50%)`,
  background: colors.Primary_Bg_Grey,
  color: colors.Primary_Blue,
  ...typography.T_16_Semibold,
});
export const liveButton = css({
  position: `absolute`,
  left: `50%`,
  bottom: -25,
  transform: `translateX(-50%)`,
  color: `white`,
  backgroundColor: `#01AD6F`,
});

export const backButton = css({
  position: `absolute`,
  top: `0`,
  left: `0`,
  margin: `${utils.remConverter(20)}`,
});

export const bodyContainer = css({
  height: `100%`,
  width: `100%`,
});
export const dropTitleContainer = css({
  display: `flex`,
  justifyContent: `space-between`,
  marginTop: utils.remConverter(46),
  alignItems: `center`,
  padding: `0 ${utils.remConverter(16)}`,
  width: `100%`,
});
export const dropTitle = css({
  ...typography.T_20_Bold,
});
export const linksContainer = css({
  height: utils.remConverter(45),
  width: utils.remConverter(45),
  borderRadius: 50,
  border: 0,
  backgroundColor: colors.Secondary_White,
  boxShadow: colors.Shadow_Circle_Sharp2,
  //   padding: utils.remConverter(12),
  display: `grid`,
  placeItems: `center`,
});

export const linkWrapper = css({
  position: `relative`,
});

export const shareNft = css({
  width: `100%`,
});

export const whitelistButtonContainer = css({
  padding: `0 ${utils.remConverter(16)}`,
});
export const whitelistButton = css({
  marginTop: utils.remConverter(9),
});
export const divider = css({
  marginTop: utils.remConverter(9),
});
export const titleCollection = css({
  ...typography.T_20_Bold,
  padding: `0 ${utils.remConverter(16)}`,
});

export const nftContainer = css({
  margin: `${utils.remConverter(20)} ${utils.remConverter(16)}`,
  display: `grid`,
  gridTemplateColumns: `repeat(2, 1fr)`,
  gap: utils.remConverter(15),
});
export const nftCard = css({
  height: utils.remConverter(312),
  width: `auto`,
  marginLeft: 0,
  marginBottom: 0,
});

export const nftCardImage = css({
  height: utils.remConverter(152),
});

export const cardBenefits = css({});
export const benefitsText = css({
  ...typography.T_20_Bold,
  marginBottom: utils.remConverter(10),
  marginLeft: utils.remConverter(16),
});

export const benefitsCard = css({
  '& > div': {
    marginLeft: `0 !important`,
  },
});

export const description = css({
  ...typography.T_14_Regular,
  color: colors.Secondary_Black_Text,
  padding: `0 ${utils.remConverter(16)}`,
  marginBottom: utils.remConverter(10),
  marginTop: utils.remConverter(10),
});
export const copyrightBoxContainer = css({
  padding: `${utils.remConverter(10)} ${utils.remConverter(16)}`,
});
export const copyrightBox = css({
  width: `100%`,
  height: utils.remConverter(48),
  boxShadow: colors.Shadow_Info_Inner_Smooth,
  borderRadius: 4,
  display: `flex`,
  padding: utils.remConverter(14),
  alignItems: `center`,
});

export const icon = css({
  height: utils.remConverter(24),
  marginRight: utils.remConverter(10),
});
export const infoText = css({
  ...typography.T_16_Regular,
  color: colors.Secondary_Black_Text,
});

export const socialIconsContainer = css({
  padding: utils.remConverter(16),
});

export const socialIcons = css({
  display: `flex`,
  justifyContent: `space-between`,
});

export const titleContainer = css({
  display: `flex`,
  justifyContent: `space-between`,
  marginTop: utils.remConverter(20),
  alignItems: `center`,
  padding: `0 ${utils.remConverter(16)}`,
  width: `100%`,
});

export const addEmail = css({
  display: `flex`,
  paddingRight: utils.remConverter(16),
  marginTop: utils.remConverter(10),
});

export const subscribeButton = css({
  flex: 2,
  ...typography.T_12_Bold,
  borderRadius: utils.remConverter(4),
  height: utils.remConverter(45),
  marginTop: utils.remConverter(8),
});

export const emailInput = {
  flex: 6,
};

export const loadBtn = css({
  ...typography.T_16_Bold,
  color: colors.Primary_Blue,
  textAlign: `center`,
  marginTop: utils.remConverter(20),
});

export const countDownElements = css({
  margin: `0 ${utils.remConverter(5)}`,
  display: `grid`,
  placeItems: `center`,
});
