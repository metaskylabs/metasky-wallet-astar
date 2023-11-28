import { css } from '@emotion/react';
import { colors, typography, utils } from '@styles/shared';

export const wrapper = css({
  display: `flex`,
  flexDirection: `column`,
  gap: utils.remConverter(12),
  justifyContent: `center`,
  alignItems: `center`,
  paddingTop: utils.remConverter(60),
});

export const iconBg = css({
  backgroundColor: colors.Grey_Background,
  width: utils.remConverter(142),
  height: utils.remConverter(142),
  display: `block`,
  padding: utils.remConverter(30),
  borderRadius: `100%`,
});

export const iconSuccess = css({
  width: utils.remConverter(81),
  height: utils.remConverter(82),
});

export const iconContainer = css({});

export const titleContainer = css({
  ...typography.T_20_Bold,
  marginTop: utils.remConverter(12),
  textAlign: `center`,
});

export const descContainer = css({
  ...typography.T_16_Regular,
  '.mainText': {
    color: colors.Grey_Text,
    textAlign: `center`,
    marginBottom: utils.remConverter(16),
  },
  '.secondaryTextHeader': {
    textAlign: `center`,
    marginBottom: utils.remConverter(8),
  },
  '.helperLink': {
    textAlign: `center`,
    textDecoration: `underline`,
    color: colors.Primary_Blue,
    cursor: `pointer`,
  },
});

export const bold = css({
  ...typography.T_16_Bold,
});
