import { css } from '@emotion/react';
import AssetsImg from '@public/images';
import { colors, mixins, typography, utils } from '@styles/shared';

export const sectionList = css({
  display: `flex`,
  flexDirection: `column`,
  gap: utils.remConverter(40),
  paddingBottom: utils.remConverter(16),
  paddingTop: utils.remConverter(16),
});

export const loaderContentInfo = css({
  textAlign: `center`,
  color: colors.Secondary_Black_Text,
});

export const bannerContainer = css({
  borderRadius: utils.remConverter(4),
  padding: `${utils.remConverter(12)} ${utils.remConverter(16)}`,
  backgroundRepeat: `no-repeat`,
  backgroundImage: `url(${AssetsImg.ic_campaign_banner.src})`,
  backgroundPosition: `center`,
  backgroundSize: `cover`,
  color: colors.White,
  cursor: `pointer`,
});

export const bannerTitle = css({
  ...typography.T_12_Bold,
});

export const bannerDescription = css({
  ...typography.T_20_Bold,
  marginTop: utils.remConverter(4),
});

export const bannerAction = css({
  ...typography.T_12_Semibold,
  marginTop: utils.remConverter(8),
});

export const rowContainer = css({
  margin: `0 ${utils.remConverter(16)}`,
  position: `relative`,
});

export const rowContainerClickable = css({
  cursor: `pointer`,
});

export const campaignImg = css({
  width: `100%`,
  aspectRatio: `1`,
  borderRadius: 4,
});

export const campaignTitle = css({
  ...typography.T_14_Bold,
  color: `white`,
  position: `absolute`,
  bottom: 0,
  margin: `${utils.remConverter(30)} ${utils.remConverter(16)}`,
});

export const sectionTitle = css({
  ...typography.T_20_Bold,
  color: colors.Secondary_Black_Text,
  marginBottom: utils.remConverter(20),
});

export const benefitList = css({
  display: `flex`,
  flexDirection: `column`,
  gap: utils.remConverter(12),
});

export const benefitContainer = css({
  boxShadow: colors.Shadow_Card_Outer_Smooth,
  display: `flex`,
  gap: utils.remConverter(12),
});

export const benefitImage = css({
  width: utils.remConverter(96),
  height: utils.remConverter(96),
  aspectRatio: `1`,
});

export const benefitTitle = css({
  ...typography.T_16_Bold,
  color: colors.Secondary_Black_Text,
  marginBottom: utils.remConverter(8),
  marginTop: utils.remConverter(8),
});

export const benefitDetail = css({
  ...typography.T_12_Semibold,
  color: colors.Secondary_Black_Text,
});

export const buttonContainer = css([
  {
    padding: utils.remConverter(16),
    width: `var(--hocWidth)`,
    boxShadow: colors.Shadow_Btn_Box,
    backgroundColor: colors.Secondary_White,
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
