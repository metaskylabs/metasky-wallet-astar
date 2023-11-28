import { css } from '@emotion/react';
import { colors, typography, utils } from '@styles/shared';

export const mainContainer = css({
  display: `flex`,
  flexDirection: `column`,
  height: `100%`,
  justifyContent: `space-between`,
});

export const wrapper = css({
  height: `100%`,
  padding: `0 ${utils.remConverter(16)} ${utils.remConverter(16)}`,
});

export const guidelineContainer = css({
  display: `flex`,
  justifyContent: `center`,
  alignItems: `center`,
  padding: `calc(20% + 16px)`,
});

export const guidelines = css({
  borderRadius: utils.remConverter(25),
  aspectRatio: `1 / 1`,
  width: `100%`,
  position: `relative`,
});

export const scanCodeContainer = css({
  position: `relative`,
  top: `0`,
  left: `0`,
  width: `100%`,
  height: `100%`,

  '& section': {
    width: `100%`,
    height: `100%`,

    '& div': {
      paddingTop: `0 !important`,
      width: `100%`,
      height: `100%`,
      '& video': {
        objectFit: `cover`,
      },
    },
  },
  '&>em': {
    position: `absolute`,
    width: `100%`,
    height: `100%`,
    zIndex: 1,
  },
  'em span:after, em span:before': {
    borderColor: colors.Primary_Blue,
    content: `""`,
    position: `absolute`,
    width: `50px`,
    height: `50px`,
    borderStyle: `solid`,
    borderWidth: `0px`,
  },
  '&>em span:nth-of-type(1):before': {
    top: 0,
    left: 0,
    borderLeftWidth: `3px`,
    borderTopWidth: `3px`,
    borderTopLeftRadius: `50%`,
  },
  '&>em span:nth-of-type(1):after': {
    top: 0,
    right: 0,
    borderRightWidth: `3px`,
    borderTopWidth: `3px`,
    borderTopRightRadius: `50%`,
  },
  'em span:nth-of-type(2):before': {
    bottom: 0,
    left: 0,
    borderLeftWidth: `3px`,
    borderBottomWidth: `3px`,
    borderBottomLeftRadius: `50%`,
  },
  'em span:nth-of-type(2):after': {
    bottom: 0,
    right: 0,
    borderRightWidth: `3px`,
    borderBottomWidth: `3px`,
    borderBottomRightRadius: `50%`,
  },
});

export const scanContainer = css({
  margin: `${utils.remConverter(-150)} auto`,
  width: utils.remConverter(219),
  textAlign: `center`,
  padding: utils.remConverter(5),
  borderRadius: utils.remConverter(10),
});

export const scanContent = css({
  ...typography.T_20_Semibold,
  color: colors.Secondary_White,
  zIndex: 0,
});

export const walletAddressCopyLink = css({
  margin: `${utils.remConverter(17)} 0`,
});

export const walletAddressCopyLinkTitle = css({
  ...typography.T_16_Bold,
  color: colors.Grey_Text,
});

export const walletAddressCopyLinkIcon = css({
  width: utils.remConverter(24),
  height: utils.remConverter(24),
});

export const walletAddressLink = css({
  ...typography.T_14_Regular,
  backgroundColor: colors.Primary_Bg_Grey,
  boxShadow: colors.Shadow_Info_Inner_Smooth,
  borderRadius: 10,
  padding: `${utils.remConverter(12)} ${utils.remConverter(8)}`,
  color: colors.Grey_Text,
  overflow: `auto`,
});

export const sendnftHeader = css({
  marginBottom: utils.remConverter(24),
});

export const sendnftImage = css({
  height: utils.remConverter(64),
  width: utils.remConverter(64),
  borderRadius: utils.remConverter(10),
  backgroundColor: colors.Grey_Border,
});
