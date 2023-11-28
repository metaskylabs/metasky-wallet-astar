import { css } from '@emotion/react';
import { colors, typography, utils } from '@styles/shared';

export const headerContainer = css({
  position: `relative`,
});

export const imageContainer = css({
  height: `30%`,
  width: `100%`,
  '& > span': {
    width: `100% !important`,
    height: `100% !important`,
  },
});

export const backButton = css({
  position: `absolute`,
  top: `0`,
  left: `0`,
  margin: `${utils.remConverter(20)}`,
});

export const bodyContainer = css({
  height: `100%`,
  width: `100%`,
  padding: `${utils.remConverter(10)}`,
});

export const cardAccessText = css({
  ...typography.T_20_Bold,
  margin: `${utils.remConverter(20)} 0 ${utils.remConverter(24)} 0`,
});

export const collectionDescriptionWrapper = css({
  marginTop: utils.remConverter(36),
});

export const divider = css({
  border: `${utils.remConverter(1)} solid ${colors.Grey_Border}`,
});

export const cardGrid = css({
  margin: `${utils.remConverter(20)} ${utils.remConverter(16)}`,
  display: `grid`,
  gridTemplateColumns: `repeat(2, 1fr)`,
  gap: utils.remConverter(15),
  '& > div': {
    height: utils.remConverter(240),
    width: `auto`,
    marginLeft: 0,
    marginBottom: 0,
  },
  '& > div > div > div': {
    height: utils.remConverter(152),
  },
});

export const shareNftContainer = css({
  boxShadow: colors.Shadow_Btn_Box,
  backgroundColor: colors.Secondary_White,
  padding: `${utils.remConverter(25)} 0`,
  position: `sticky`,
  bottom: 0,
  zIndex: 10,
});

export const shareNftWrapper = css({
  margin: `0 ${utils.remConverter(10)}`,
});

export const shareNft = css({
  width: `100%`,
});
