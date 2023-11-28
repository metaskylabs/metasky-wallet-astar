import { css } from '@emotion/react';
import { colors, mixins, typography, utils } from '@styles/shared';

export const purchaseSuccessIcon = css({
  minHeight: `100%`,
  overflow: `auto`,
  paddingBottom: utils.remConverter(200),
});

export const successIcon = css({
  width: utils.remConverter(200),
  height: utils.remConverter(200),
  backgroundColor: colors.Grey_Border,
  borderRadius: `50%`,
});

export const successImg = css({
  width: utils.remConverter(120),
  height: utils.remConverter(120),
});

export const purchaseCongratulation = css({
  ...typography.T_20_Bold,
  color: colors.Secondary_Black_Text,
  marginTop: utils.remConverter(40),
  marginBottom: utils.remConverter(12),
});

export const purchaseDescription = css({
  ...typography.T_16_Regular,
  color: colors.Secondary_Black_Text,
  textAlign: `center`,
  padding: `0 ${utils.remConverter(24)} 0  ${utils.remConverter(24)}`,
});

export const closeWindow = css({
  ...typography.T_14_Regular,
  color: colors.Grey_Text,
});

export const loaderContentInfo = css({
  textAlign: `center`,
  color: colors.Secondary_Black_Text,
});

export const loaderContainer = css({
  display: `flex`,
  flexDirection: `column`,
  justifyContent: `center`,
  alignItems: `center`,
  height: `100%`,
});

export const infoContainer = css({
  width: `100%`,
  backgroundColor: colors.Secondary_White,
  borderRadius: utils.remConverter(4),
  padding: `${utils.remConverter(20)} ${utils.remConverter(15)}`,
  display: `flex`,
  flexDirection: `column`,
  gap: utils.remConverter(16),
});

export const info = css({
  ...typography.T_14_Regular,
});

export const infoRoot = css({
  width: `100%`,
  marginTop: utils.remConverter(24),
  padding: `0 ${utils.remConverter(24)}`,
});

export const cta = css({
  ...typography.T_16_Bold,
  width: `100%`,
  margin: `${utils.remConverter(16)}`,
});

export const ctaContainer = css([
  {
    boxShadow: colors.Shadow_Btn_Box,
    backgroundColor: colors.Secondary_White,
    position: `sticky`,
    bottom: 0,
    zIndex: 10,
    width: `var(--hocWidth)`,
  },
]);
