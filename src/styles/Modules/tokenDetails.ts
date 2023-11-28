import { css } from '@emotion/react';
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

export const primaryButton = css({
  position: `absolute`,
  top: `93%`,
  right: `25%`,
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
  padding: `${utils.remConverter(10)}`,
});

export const cardAccessText = css({
  ...typography.T_20_Bold,
  margin: `${utils.remConverter(25)} 0`,
});

export const divider = css({
  border: `${utils.remConverter(1)} solid ${colors.Grey_Border}`,
});

export const cardBenefits = css({
  margin: `${utils.remConverter(5)} 0`,
});

export const benefitsText = css({
  ...typography.T_20_Bold,
  marginBottom: utils.remConverter(10),
});

export const benefitsCard = css({
  marginLeft: `0 !important`,
  backgroundColor: colors.Primary_Yellow,
});

export const shareNftContainer = css({
  boxShadow: colors.Shadow_Btn_Box,
  backgroundColor: colors.Secondary_White,
  padding: `${utils.remConverter(25)} 0`,
});

export const shareNftWrapper = css({
  margin: `0 ${utils.remConverter(10)}`,
});

export const shareNft = css({
  width: `100%`,
});
