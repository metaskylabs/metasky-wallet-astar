import AssetsImg from '@public/images';
import { colors, typography, utils } from '@/styles/shared';
import { css } from '@emotion/react';

export const couponCardContainer = css({
  position: `relative`,
  overflow: `hidden`,
  height: utils.remConverter(204),
  width: `100%`,
  // background: colors.Shadow_Card_Outer_Sharp,
  backgroundBlendMode: `soft-light, normal`,
  // boxShadow: colors.Shadow_Card_Outer_Sharp2,
  display: `flex`,
  flexDirection: `row`,
  cursor: `pointer`,
});

export const couponCardWrapper = css({
  display: `flex`,
  alignItems: `center`,
  justifyContent: `center`,
  overflow: `clip`,
  width: `100%`,
  position: `relative`,
  padding: `${utils.remConverter(35)} ${utils.remConverter(35)}`,
  backgroundImage: `url(${AssetsImg.i_benefits_card_NFT.src})`,
  backgroundPosition: `center`,
  backgroundSize: `100% 100%`,
  backgroundRepeat: `no-repeat`,
});

export const couponCardImg = css({
  borderRadius: utils.remConverter(10),
  marginRight: `${utils.remConverter(16)}`,
  width: `150px`,
  minWidth: `25%`,
  height: `auto`,
  zIndex: 2,
  objectFit: `cover`,
});

export const couponCardBody = css({
  color: colors.Secondary_Black_Text,
  height: `100%`,
  width: `60%`,
  maxWidth: `70%`,
});

export const couponCardTitle = css({
  ...typography.T_16_Bold,
  display: `block`,
  marginBottom: utils.remConverter(8),
  zIndex: 2,
});

export const couponCardDescription = css({
  ...typography.T_12_Light,
  zIndex: 2,
  overflow: `hidden`,
  textOverflow: `ellipsis`,
  marginBottom: utils.remConverter(5),
  height: utils.remConverter(40),
});

export const benefitTimeless = css({
  width: `100%`,
});

export const timelessIcon = css({
  marginRight: utils.remConverter(4),
});

export const timelessText = css({
  ...typography.T_12_Semibold,
  color: colors.Secondary_Black_Text,
});

export const date = css({
  ...typography.T_12_Semibold,
});

export const couponCardFooter = css({
  ...typography.T_12_Semibold,
});

export const couponCardFooterMargin = css({
  ...typography.T_12_Semibold,
  marginBottom: utils.remConverter(5),
  zIndex: 2,
});

export const backGroundPattern = css({
  position: `absolute`,
  transform: `scale(1.067,1.067)`,
  zIndex: 1,
});

export const backButton = css({
  boxShadow: colors.Shadow_Btn_S_Outer_Smooth,
  backgroundColor: colors.Secondary_White,
  borderRadius: 20,
  border: 0,
  width: utils.remConverter(32),
  height: utils.remConverter(32),
});

export const blueArrow = css({
  height: utils.remConverter(16),
  width: utils.remConverter(16),
});
