import { colors, typography, utils } from '@styles/shared';
import { css } from '@emotion/react';

export const textCenter = css({
  textAlign: `center`,
});

export const icon = css({
  display: `flex`,
  alignItems: `center`,
  justifyContent: `center`,
  width: `142px`,
  height: `142px`,
  margin: `177px auto 48px`,
  background: colors.Grey_Border,
  borderRadius: `50%`,
});

export const title = css({
  color: colors.Secondary_Black_Text,
  ...typography.T_20_Bold,
});

export const text = css({
  ...typography.T_16_Regular,
  margin: `12px 12px`,
  textAlign: `center`,
  color: colors.Grey_Text,
});

export const subText = css({
  color: colors.Secondary_Black_Text,
});

export const contactUs = css({
  margin: `20px 12px`,
  textAlign: `center`,
  color: colors.Primary_Blue,
  ...typography.T_16_Semibold,
});
