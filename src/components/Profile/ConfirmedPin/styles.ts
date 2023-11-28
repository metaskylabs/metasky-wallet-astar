import { colors, typography, utils } from '@styles/shared';
import { css } from '@emotion/react';

export const bottomSheetContainer = css({
  display: `flex`,
  flexDirection: `column`,
  justifyContent: `center`,
  alignItems: `center`,
  marginTop: utils.remConverter(84),
});

export const imgContainer = css({
  height: utils.remConverter(142),
  width: utils.remConverter(142),
  borderRadius: `50%`,
  backgroundColor: colors.Grey_Border,
  padding: utils.remConverter(31.5),
});

export const textContainer = css({
  textAlign: `center`,
  marginTop: utils.remConverter(48),
});

export const pinUpdatedTitle = css({
  ...typography.T_20_Bold,
  color: colors.Secondary_Black_Text,
});

export const subtitle = () =>
  css({
    ...typography.T_16_Regular,
    color: colors.Secondary_Black_Text,
    marginBottom: utils.remConverter(112),
  });
