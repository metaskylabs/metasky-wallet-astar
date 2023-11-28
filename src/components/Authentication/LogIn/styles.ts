import { colors, typography } from '@styles/shared';
import { css } from '@emotion/react';

export const icon = css({
  display: `flex`,
  alignItems: `center`,
  justifyContent: `center`,
  width: `142px`,
  height: `142px`,
  margin: `85px auto 48px`,
  background: colors.Grey_Border,
  borderRadius: `50%`,
});

export const button = css({
  color: colors.Primary_Blue,
  background: colors.Primary_Bg_Grey,
  boxShadow: colors.Shadow_Card_Outer_Sharp2,
  borderRadius: `10px`,
  padding: `12px`,
  width: `100%`,
  border: `0`,
  ...typography.T_16_Semibold,
});

export const buttonIcon = css({
  marginRight: `16px`,
  lineHeight: 1,
  transform: `translateY(5px)`,
  display: `inline-block`,
});

export const hr = css({
  height: `1px`,
  background: `#CCD5EC`,
  width: `100%`,
  textAlign: `center`,
  margin: `40px 0 15px`,
});

export const hrSpan = css({
  background: colors.Primary_Bg_Grey,
  padding: `0 16px`,
  display: `inline-block`,
  transform: `translateY(-14px)`,
  color: colors.Grey_Text,
  ...typography.T_16_Regular,
});

export const link = css({
  color: colors.Primary_Blue,
  border: `0`,
  background: `transparent`,
  ...typography.T_16_Semibold,
});

export const textCenter = css({
  textAlign: `center`,
});
