import { colors, typography, utils } from '@styles/shared';
import { css } from '@emotion/react';

export const tokenInformation = css({
  boxShadow: colors.Shadow_Info_Inner_Smooth,
  borderRadius: 10,
  backgroundColor: colors.Primary_Bg_Grey,
  margin: `${utils.remConverter(15)} 0`,
});

export const tokenInformationContainer = css({
  boxShadow: colors.Shadow_Info_Inner_Smooth,
  borderRadius: 10,
  backgroundColor: colors.Primary_Bg_Grey,
  margin: `${utils.remConverter(15)} 0`,
  display: `flex`,
});

export const paddingContainer = css({
  padding: `${utils.remConverter(8)} ${utils.remConverter(16)}`,
});

export const tokenInfoContainer = css({
  alignItems: `center`,
  width: `50%`,
  textAlign: `center`,
  justifyContent: `center`,
  '& > div > span': {
    //TODO:- will remove in upcoming release
    ...typography.T_20_Bold,
  },
  '& > div > small': {
    //TODO:- will remove in upcoming release
    ...typography.T_16_Regular,
  },
});

export const tokenInfo = css({
  width: `100%`,
  alignItems: `center`,
  '& > span': {
    //TODO:- will remove in upcoming release
    ...typography.T_20_Bold,
  },
  '& > small': {
    //TODO:- will remove in upcoming release
    ...typography.T_16_Regular,
  },
  padding: `${utils.remConverter(8)} 0`,
});

export const tokenVerticalLine = css({
  borderRight: `1px solid ${colors.Grey_Border}`,
});

export const rarityContainer = css({
  height: utils.remConverter(19),
  background: colors.Gradient_Purple,
  borderRadius: 14,
  color: colors.Secondary_White,
  padding: utils.remConverter(3),
  ...typography.T_12_Regular,
});

export const rarityText = css({
  background: colors.Gradient_Purple,
  WebkitBackgroundClip: `text`,
  WebkitTextFillColor: `transparent`,
});

export const rarityTitle = css({
  wordBreak: `break-all`,
  overflow: `hidden`,
  textOverflow: `ellipsis`,
  display: `-webkit-box`,
  WebkitLineClamp: `1`,
  WebkitBoxOrient: `vertical`,
});

export const infoContainer = css({
  alignItems: `center`,
  textAlign: `center`,
  justifyContent: `center`,
  flex: 1,
  '& > div > span': {
    //TODO:- will remove in upcoming release
    ...typography.T_20_Bold,
  },
  '& > div > small': {
    //TODO:- will remove in upcoming release
    ...typography.T_16_Regular,
  },
});

export const leftVerticalLine = css({
  borderLeft: `1px solid ${colors.Grey_Border}`,
});

export const rightVerticalLine = css({
  borderRight: `1px solid ${colors.Grey_Border}`,
});
