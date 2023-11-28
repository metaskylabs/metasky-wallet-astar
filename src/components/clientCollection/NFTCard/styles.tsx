import { css } from '@emotion/react';
import { colors, typography, utils } from '@styles/shared';

export const NFTMainCard = css({
  flex: 1,
  wordWrap: `break-word`,
  position: `relative`,
  backgroundColor: colors.Primary_Bg_Grey,
  borderRadius: 4,
  overflow: `hidden`,
  boxShadow: colors.Shadow_Card_Outer_Smooth,
  cursor: `pointer`,
  ...typography.T_12_Semibold,
  height: `100%`,
});

export const NFTCardImg = css({
  height: `auto`,
  width: `100%`,
  borderRadius: `${utils.remConverter(4)} ${utils.remConverter(
    4,
  )} ${utils.remConverter(0)} ${utils.remConverter(0)}`,
  objectFit: `contain`,
});

export const NFTCardDescription = css({
  margin: `${utils.remConverter(10)}`,
  '.cardHeader': {
    ...typography.T_14_Bold,
  },
  '.cardPurchaseDetails': {
    display: `grid`,
    alignItems: `center`,
    gridTemplateColumns: `repeat(3, max-content)`,
    columnGap: `5px`,
    marginTop: `${utils.remConverter(5)}`,
    ...typography.T_14_Regular,
    color: colors.Grey_Text,
    '.cardPrice': {
      color: colors.Black,
    },
  },
});
