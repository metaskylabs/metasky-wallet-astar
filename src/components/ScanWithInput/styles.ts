import { css } from '@emotion/react';
import { colors, typography, utils } from '@styles/shared';

export const cta = css({
  width: `100%`,
});

export const ctaContainer = css({
  padding: `0 ${utils.remConverter(16)} ${utils.remConverter(32)}`,
});

export const innerWrapper = css({
  height: `100%`,
  display: `flex`,
  flexDirection: `column`,
  justifyContent: `space-between`,
  gap: utils.remConverter(12),
  padding: `0 ${utils.remConverter(16)} ${utils.remConverter(46)}`,
});

export const header = css({
  ...typography.T_20_Bold,
  textAlign: `center`,
  marginBottom: utils.remConverter(24),
});

export const orText = css({
  ...typography.T_14_Regular,
  textAlign: `center`,
});

export const scanRoot = css({
  width: `100%`,
  minHeight: utils.remConverter(452),
  position: `relative`,
  backfaceVisibility: `hidden`,
  padding: utils.remConverter(10),
});

export const guidelineContainer = css({
  display: `flex`,
  justifyContent: `center`,
  alignItems: `center`,
  padding: `20%`,
});

export const guidelines = css({
  borderRadius: utils.remConverter(25),
  aspectRatio: `1 / 1`,
  width: `100%`,
  position: `relative`,
});

export const vedioElem = css({
  position: `absolute`,
  right: 0,
  bottom: 0,
  minWidth: `100%`,
  minHeight: `100%`,
  width: `auto`,
  height: `auto`,
  zIndex: `-100`,
  backgroundSize: `cover`,
  overflow: `hidden`,
});

export const scanCodeContainer = css({
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

export const inputLabel = {
  ...typography.T_16_Semibold,
};

export const inputContainer = css({
  padding: 0,
  margin: `0px 0px ${utils.remConverter(12)} 0px`,
});
