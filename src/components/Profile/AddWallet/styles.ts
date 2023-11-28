import { colors, typography, utils } from '@styles/shared';
import { css } from '@emotion/react';

export const bottomSheetContainer = css({
  display: `flex`,
  flexDirection: `column`,
  justifyContent: `center`,
  alignItems: `center`,
});

export const imgContainer = css({
  height: utils.remConverter(64),
  width: utils.remConverter(64),
  background: colors.Grey_Border,
  padding: utils.remConverter(5),
  borderRadius: utils.remConverter(10),
});

export const titleContainer = css({
  display: `flex`,
  justifyContent: `flex-start`,
  alignItems: `center`,
});

export const title = css({
  ...typography.T_20_Bold,
  color: colors.Secondary_Black_Text,
  marginLeft: utils.remConverter(12),
});

export const subtitle = () =>
  css({
    ...typography.T_16_Bold,
    color: colors.Secondary_Black_Text,
    textAlign: `left`,
  });

export const description = css({
  ...typography.T_14_Regular,
  color: colors.Secondary_Black_Text,
});

export const codeContainer = css({
  height: utils.remConverter(180),
  width: utils.remConverter(358),
  background: colors.Secondary_White,
  marginTop: utils.remConverter(42),
  marginBottom: utils.remConverter(40),
  borderRadius: utils.remConverter(10),
});

export const link = css({
  color: colors.Primary_Blue,
});
