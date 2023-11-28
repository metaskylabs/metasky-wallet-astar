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
  display: `flex`,
  justifyContent: `center`,
  alignItems: `center`,
  padding: utils.remConverter(30),
  borderRadius: `100%`,
});

export const iconContainer = css({});

export const titleContainer = css({
  ...typography.T_16_Bold,
  marginTop: utils.remConverter(12),
  marginBottom: utils.remConverter(24),
});
