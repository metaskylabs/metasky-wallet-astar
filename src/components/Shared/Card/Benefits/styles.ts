import AssetsImg from '@public/images';
import { colors, typography, utils } from '@styles/shared';
import { css } from '@emotion/react';

export const couponCardContainer = css({
  position: `relative`,
  overflow: `hidden`,
  // background: colors.Shadow_Card_Outer_Sharp,
  backgroundBlendMode: `soft-light, normal`,
  // boxShadow: colors.Shadow_Card_Outer_Sharp2,
  borderRadius: 10,
  display: `flex`,
  flexDirection: `row`,
  width: `100%`,
  margin: `${utils.remConverter(20)} ${utils.remConverter(0)}`,
  marginLeft: utils.remConverter(25),
  backgroundImage: `url(${AssetsImg.i_benefitCardBackground.src})`,
  backgroundPosition: `center`,
  backgroundSize: `100% 100%`,
  cursor: `pointer`,
});

export const couponCardWrapper = css({
  display: `flex`,
  alignItems: `center`,
  justifyContent: `center`,
  overflow: `clip`,
  width: `100%`,
  position: `relative`,
  padding: `${utils.remConverter(32)} ${utils.remConverter(25)}`,
});

export const couponCardImg = css({
  marginRight: `${utils.remConverter(10)}`,
  width: 100,
  height: 100,
  zIndex: 2,
  objectFit: `cover`,
  borderRadius: 10,
});

export const couponCardBody = css({
  color: colors.Secondary_Black_Text,
  display: `flex`,
  flexDirection: `column`,
  justifyContent: `space-between`,
  width: `calc(100% - 120px)`,
  zIndex: 2,
  position: `relative`,
});

export const couponCardTitle = css({
  ...typography.T_14_Bold,
  marginBottom: `${utils.remConverter(3)}`,
  zIndex: 2,
  overflow: `hidden`,
});

export const couponCardDescription = css({
  ...typography.T_12_Light,
  zIndex: 2,
  overflow: `hidden`,
  textOverflow: `ellipsis`,
  width: `auto`,
});

export const couponCardFooter = css({
  ...typography.T_12_Semibold,
  marginRight: `${utils.remConverter(10)}`,
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

export const couponCardbackButton = css({
  width: utils.remConverter(28),
  height: utils.remConverter(28),
  '& > span': {
    width: `${utils.remConverter(13)} !important`,
    height: `${utils.remConverter(13)} !important`,
    transform: `rotate(180deg)`,
  },
});
