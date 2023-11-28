import { css } from '@emotion/react';
import { colors, typography, utils } from '@styles/shared';

export const scanOverlay = css({
  position: `fixed`,
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
  height: `100%`,
  width: `100%`,
  opacity: `0.4`,
  background: `black`,
  zIndex: -1,
});

export const mainContainer = css({
  display: `flex`,
  flexDirection: `column`,
  height: `100%`,
  justifyContent: `space-between`,
  '&>div:first-child': {
    zIndex: `10`,
  },
});
export const nftHeader = css({
  padding: `${utils.remConverter(20)} ${utils.remConverter(16)}`,
});

export const flashIcon = css({
  width: utils.remConverter(40),
  height: utils.remConverter(40),
});

export const scanBodyWrapper = css({
  height: `80vh`,
});

export const scanWrapper = css({
  height: `60vh`,
});

export const scanCodeContainer = css({
  // maxWidth: utils.remConverter(344),
  // maxHeight: utils.remConverter(341),
  // position: `relative`,
  // left: `50%`,
  // top: `50%`,
  // transform: `translate(-50%,-50%)`,
  // backfaceVisibility: `hidden`,
  // padding: utils.remConverter(10),
  position: `absolute`,
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
        width: `100%`,
        height: `100%`,
        objectFit: `cover`,
        zIndex: `-1`,
      },
    },
  },
  '&>em': {
    position: `absolute`,
    width: `100%`,
    paddingBottom: `100%`,
    display: `block`,
    left: `50%`,
    top: `40%`,
    transform: `translate(-50%,-50%)`,
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
    top: `20%`,
    left: `20%`,
    borderLeftWidth: `3px`,
    borderTopWidth: `3px`,
    borderTopLeftRadius: `50%`,
  },
  '&>em span:nth-of-type(1):after': {
    top: `20%`,
    right: `20%`,
    borderRightWidth: `3px`,
    borderTopWidth: `3px`,
    borderTopRightRadius: `50%`,
  },
  'em span:nth-of-type(2):before': {
    bottom: `20%`,
    left: `20%`,
    borderLeftWidth: `3px`,
    borderBottomWidth: `3px`,
    borderBottomLeftRadius: `50%`,
  },
  'em span:nth-of-type(2):after': {
    bottom: `20%`,
    right: `20%`,
    borderRightWidth: `3px`,
    borderBottomWidth: `3px`,
    borderBottomRightRadius: `50%`,
  },
});

export const scanContainer = css({
  margin: `${utils.remConverter(50)} auto`,
  width: utils.remConverter(219),
  textAlign: `center`,
  background: colors.Scan_Display_Text_Background,
  padding: utils.remConverter(5),
  borderRadius: utils.remConverter(10),
});

export const scanContent = css({
  ...typography.T_20_Semibold,
  color: colors.Secondary_Black_Text,
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

export const container = css({
  padding: `0 ${utils.remConverter(16)} ${utils.remConverter(48)}`,
  display: `flex`,
  flexDirection: `column`,
  justifyContent: `end`,
  height: `100%`,
});

export const wrapper = css({
  width: `100%`,
});
