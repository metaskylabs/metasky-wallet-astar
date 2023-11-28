import { css } from '@emotion/react';
import { colors, mixins, typography } from '@styles/shared';
import utils from '@styles/shared/utils';

export const pointer = css({
  cursor: `pointer`,
});
export const transactionsImageContainer = css({
  width: utils.remConverter(100),
  height: utils.remConverter(100),
  objectFit: `cover`,
  borderRadius: `4px 0 0 4px`,
});
export const consumeBtn = css({
  width: utils.remConverter(110),
  height: utils.remConverter(28),
  display: `flex`,
  justifyContent: `center`,
  alignItems: `center`,
  textTransform: `uppercase`,
  marginTop: utils.remConverter(8),
  ...typography.T_12_Bold,
});
export const consumedBtn = css({
  ...typography.T_12_Semibold,
  background: colors.Tertiary_Toast_Green,
  borderRadius: utils.remConverter(4),
  padding: utils.remConverter(4),
  color: colors.Secondary_White,
  width: utils.remConverter(100),
  textTransform: `uppercase`,
});
export const consumedBtnIcon = css({
  marginRight: utils.remConverter(3),
});

export const transactionsDetailsInfo = css({
  marginLeft: utils.remConverter(20),
  height: `100%`,
  width: `100%`,
  padding: `${utils.remConverter(14)} 0`,
});

export const transactionsDetailsInfoTitle = css({
  ...typography.T_16_Semibold,
  color: colors.Secondary_Black_Text,
  margin: 0,
  marginBottom: utils.remConverter(10),
});

export const loader = css({
  width: utils.remConverter(15),
  margin: utils.remConverter(15),
});

export const transactionsDetailsContent = css({
  display: `flex`,
  flexDirection: `column`,
  justifyContent: `center`,
  height: `100%`,
  width: `100%`,
});
