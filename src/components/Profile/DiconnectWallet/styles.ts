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

export const title = css({
  ...typography.T_20_Bold,
  color: colors.Secondary_Black_Text,
});

export const subtitle = () =>
  css({
    ...typography.T_16_Regular,
    color: colors.Secondary_Black_Text,
    marginBottom: utils.remConverter(112),
  });

export const btnContainer = () =>
  css({
    position: `absolute`,
    bottom: 0,
    width: `100%`,
    display: `flex`,
    alignItems: `center`,
    justifyContent: `space-between`,
    background: colors.Secondary_White,
    padding: `0 ${utils.remConverter(16)}`,
    borderTop: `solid 1px ${colors.Grey_Border}`,
  });

export const cancelBtn = css({
  ...typography.T_16_Bold,
  width: utils.remConverter(172),
  height: utils.remConverter(54),
});
export const disconnectBtn = css({
  ...typography.T_16_Bold,
  width: utils.remConverter(172),
  height: utils.remConverter(54),
});
