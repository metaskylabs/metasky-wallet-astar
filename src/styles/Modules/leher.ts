import { css } from '@emotion/react';

const PURPLE = `#6b59bf`;

export const mainContainer = css({
  position: `fixed`,
  top: 0,
  left: 0,
  width: `100%`,
  height: `100%`,
  backgroundColor: PURPLE,
  fontFamily: `Lato`,
  overflow: `hidden`,
  overflowY: `scroll`,
  zIndex: 1000,
});

export const headerContainer = css({
  background: `#1f1f1f`,
  boxShadow: `0 0 4px rgb(0 0 0 / 12%), 0 4px 4px rgb(0 0 0 / 24%)`,
  padding: `15px 15px 15px 0`,
  border: 0,
  height: `80px`,
  display: `flex`,
  flexDirection: `row`,
  justifyContent: `space-between`,
  alignItems: `center`,
  img: {
    width: `118px`,
    height: `40px`,
    verticalAlign: `middle`,
    marginTop: -6,
  },
});

export const btn = css({
  boxSizing: `border-box`,
  border: `0 solid`,
  height: `24px`,
  width: `96px`,
  left: `0`,
  top: `0`,
  borderRadius: `4px`,
  background: `linear-gradient(91.72deg,#2f80ed,#9b51e0 97.09%)`,
  boxShadow: `0 4px 4px 0 #00000040`,
  fontStyle: `normal`,
  fontWeight: 500,
  fontSize: `10px`,
  lineHeight: `16px`,
  alignItems: `center`,
  textAlign: `center`,
  color: `#f2f2f2`,
  cursor: `pointer`,
  '&.big': {
    height: `40px`,
    width: `150px`,
    fontSize: `16px`,
  },
});

export const innerContainer = css({
  display: `flex`,
  flexDirection: `column`,
  justifyContent: `center`,
  alignItems: `center`,
  background: `linear-gradient(180deg,#4439a8,#6a59bf)`,
  minHeight: `300px`,
});

export const overlay = css({
  position: `fixed`,
  top: 0,
  left: 0,
  zIndex: 1001,
  backgroundColor: `rgba(0,0,0,0.7)`,
  height: `100%`,
  width: `100%`,
  cursor: `pointer`,
});

export const iframeContainer = css({
  position: `fixed`,
  boxShadow: `0 4px 4px 0 #00000040`,
  top: `5vh`,
  left: 0,
  right: 0,
  margin: `0 auto`,
  zIndex: 1002,
  maxWidth: 428,
  backgroundColor: `#fff`,
  maxHeight: `90vh`,
  height: `100%`,
  '@media only screen and (max-width: 428px)': {
    maxWidth: `100%`,
    maxHeight: `100%`,
    height: `100%`,
    top: 0,
  },
  iframe: {
    border: 0,
    width: `100%`,
    height: `calc(100% - 35px)`,
    verticalAlign: `middle`,
  },
});

export const iframeClose = css({
  height: 35,
  border: 0,
  display: `flex`,
  justifyContent: `flex-end`,
  button: {
    border: 0,
    padding: `5px 10px`,
    background: `transparent`,
    height: 35,
    borderRadius: 0,
    fontSize: `12px`,
    color: PURPLE,
    fontWeight: `bold`,
    display: `flex`,
    alignItems: `center`,
    lineHeight: 1,
    '.x': {
      fontSize: `20px`,
      display: `inline-block`,
      marginLeft: `5px`,
      marginTop: -1,
    },
  },
});
