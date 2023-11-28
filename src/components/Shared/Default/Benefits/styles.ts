import { colors, typography, utils } from '@styles/shared';
import { css } from '@emotion/react';
import AssetsImg from '@public/images';

export const couponCardContainer = css({
  position: `relative`,
  overflow: `hidden`,
  backgroundImage: `url(${AssetsImg.i_benefitCardBackgroundPng.src})`,
  backgroundBlendMode: `soft-light, normal`,
  borderRadius: 10,
  display: `flex`,
  margin: `${utils.remConverter(16)}`,
  backgroundPosition: `center`,
  backgroundSize: `100% 100%`,
});

export const couponCardWrapper = css({
  display: `flex`,
  overflow: `clip`,
  maxHeight: `${utils.remConverter(132)}`,
  margin: `5% 10%`,
});

export const couponCardImg = css({
  width: utils.remConverter(200),
  zIndex: 2,
  background: colors.Grey_Border,
  borderRadius: utils.remConverter(10),
  padding: utils.remConverter(5),
});

export const couponCardBody = css({
  color: colors.Secondary_Black_Text,
  display: `flex`,
  flexDirection: `column`,
  justifyContent: `space-between`,
  zIndex: 2,
  padding: `2% 1% 0 2%`,
  overflow: `hidden`,
  textOverflow: `ellipsis`,
});

export const couponCardTitle = css({
  ...typography.T_14_Bold,
  marginBottom: `${utils.remConverter(3)}`,
  zIndex: 2,
});

export const couponCardDescription = css({
  ...typography.T_12_Light,
  zIndex: 2,
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

export const couponCardbackButton = css({
  width: utils.remConverter(28),
  height: utils.remConverter(28),
  '& > span': {
    width: `${utils.remConverter(13)} !important`,
    height: `${utils.remConverter(13)} !important`,
    transform: `rotate(180deg)`,
  },
});

export const backButtonContainer = css({
  position: `absolute`,
  right: utils.remConverter(10),
  bottom: utils.remConverter(10),
});
