import { colors, typography, utils } from '@styles/shared';
import { css } from '@emotion/react';

export const sendnftHeader = css({
  marginBottom: utils.remConverter(24),
});

export const sendnftImage = css({
  height: utils.remConverter(64),
  width: utils.remConverter(64),
  borderRadius: utils.remConverter(10),
  backgroundColor: colors.Grey_Border,
});

export const sendnftTitle = css({
  marginLeft: utils.remConverter(12),
  ...typography.T_20_Bold,
});

export const shareNftImage = css({
  height: utils.remConverter(358),
  width: utils.remConverter(358),
  margin: `${utils.remConverter(20)} auto`,
  '& > span': {
    borderRadius: 10,
    height: `100% !important`,
    width: `100% !important`,
  },
});

export const shareNftText = css({
  color: colors.Secondary_Black_Text,
  ...typography.T_20_Semibold,
});

export const shareNftSocialLinks = css({
  width: `80%`,
  margin: `${utils.remConverter(29)} auto`,
  display: `grid`,
  gridTemplateColumns: `repeat(3, 1fr)`,
  gridGap: utils.remConverter(30),
});

export const shareNftCopyLink = css({
  backgroundColor: colors.Primary_Bg_Grey,
  boxShadow: colors.Shadow_Info_Inner_Sharp,
  borderRadius: 50,
  padding: `${utils.remConverter(12)} 0`,
  cursor: `pointer`,
});

export const shareNftCopyText = css({
  color: colors.Primary_Blue,
  marginLeft: utils.remConverter(4),
  ...typography.T_16_Semibold,
});

export const shareNftLinkCopiedWrapper = css({
  backgroundColor: colors.Secondary_Black_Text,
  borderRadius: 10,
  padding: `${utils.remConverter(12)} 0`,
});

export const shareNftLinkCopied = css({
  color: colors.Secondary_White,
  ...typography.T_16_Semibold,
});
