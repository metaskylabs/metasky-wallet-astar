import { css } from '@emotion/react';
import { colors, mixins, utils } from '@styles/shared';

export const iconContainer = css({
  textAlign: `center`,
  width: utils.remConverter(142),
  height: utils.remConverter(142),
  margin: `${utils.remConverter(72)} auto ${utils.remConverter(24)} auto`,
  backgroundColor: colors.Grey_Border,
  borderRadius: `100%`,
});

export const buttonContainer = css({
  width: `100%`,
  background: colors.Secondary_White,
  borderTop: `1px solid ${colors.Grey_Border}`,
});

export const deleteButton = css({
  textTransform: `uppercase`,
  width: `50%`,
  margin: `${utils.remConverter(17)} ${utils.remConverter(
    16,
  )} ${utils.remConverter(17)} 0`,
});

export const cancelbutton = css({
  textTransform: `uppercase`,
  width: `100%`,
  margin: `${utils.remConverter(17)} ${utils.remConverter(16)}`,
});

export const successContentWrapper = css({
  textAlign: `center`,
  margin: `0 auto`,
});

export const contentWrapper = css({
  ...mixins.flexColumn,
  alignItems: `center`,
  justifyContent: `center`,
  height: `100%`,
});
