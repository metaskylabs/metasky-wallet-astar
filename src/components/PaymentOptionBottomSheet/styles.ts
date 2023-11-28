import { css } from '@emotion/react';
import { colors, typography, utils } from '@styles/shared';

export const paymentMethodTitle = css({
  ...typography.T_14_Regular,
  marginLeft: utils.remConverter(10),
});

export const paymentList = css({
  marginTop: utils.remConverter(20),
  marginBottom: utils.remConverter(40),
  display: `flex`,
  flexDirection: `column`,
  gap: utils.remConverter(20),
});

export const buttonContainer = css({
  padding: utils.remConverter(16),
  background: colors.Secondary_White,
  borderTop: `1px solid ${colors.Grey_Border}`,
  width: `100%`,
});

export const ctaButton = css({
  width: `100%`,
});

export const bottomSheet = css({
  padding: 0,
});

export const bottomSheetBody = css({
  padding: `${utils.remConverter(24)} ${utils.remConverter(15)}`,
});
