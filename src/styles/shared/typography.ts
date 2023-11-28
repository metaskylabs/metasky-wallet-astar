import { CSSObject } from '@emotion/react';
import utils from '@styles/shared/utils';

interface Styles {
  [key: string]: CSSObject;
}

const typography: Styles = {
  T_28_Bold: {
    fontFamily: `Lato`,
    fontStyle: `normal`,
    fontWeight: 800,
    fontSize: utils.remConverter(28),
    lineHeight: `36px`,
    letterSpacing: `0.5px`,
  },
  T_24_Bold: {
    fontFamily: `Lato`,
    fontStyle: `normal`,
    fontWeight: 800,
    fontSize: utils.remConverter(24),
    lineHeight: `36px`,
    letterSpacing: `0.5px`,
  },
  T_20_Bold: {
    fontFamily: `Lato`,
    fontStyle: `normal`,
    fontWeight: 800,
    fontSize: utils.remConverter(20),
    lineHeight: `30px`,
    letterSpacing: `0.5px`,
  },
  T_20_Semibold: {
    fontFamily: `Lato`,
    fontStyle: `normal`,
    fontWeight: 700,
    fontSize: utils.remConverter(20),
    lineHeight: `30px`,
    letterSpacing: `0.5px`,
  },
  T_20_Regular: {
    fontFamily: `Lato`,
    fontStyle: `normal`,
    fontWeight: 500,
    fontSize: utils.remConverter(20),
    lineHeight: `30px`,
  },
  T_16_Bold: {
    fontFamily: `Lato`,
    fontStyle: `normal`,
    fontWeight: 800,
    fontSize: utils.remConverter(16),
    lineHeight: `24px`,
    letterSpacing: `0.5px`,
  },
  T_16_Semibold: {
    fontFamily: `Lato`,
    fontStyle: `normal`,
    fontWeight: 700,
    fontSize: utils.remConverter(16),
    lineHeight: `24px`,
    letterSpacing: `0.5px`,
  },
  T_16_Regular: {
    fontFamily: `Lato`,
    fontStyle: `normal`,
    fontWeight: 500,
    fontSize: utils.remConverter(16),
    lineHeight: `24px`,
  },
  T_14_Bold: {
    fontFamily: `Lato`,
    fontStyle: `normal`,
    fontWeight: 800,
    fontSize: utils.remConverter(14),
    lineHeight: `21px`,
    letterSpacing: `0.5px`,
  },
  T_14_Semibold: {
    fontFamily: `Lato`,
    fontStyle: `normal`,
    fontWeight: 700,
    fontSize: utils.remConverter(14),
    lineHeight: `21px`,
  },
  T_14_Regular: {
    fontFamily: `Lato`,
    fontStyle: `normal`,
    fontWeight: 500,
    fontSize: utils.remConverter(14),
    lineHeight: `21px`,
  },
  T_12_Bold: {
    fontFamily: `Lato`,
    fontStyle: `normal`,
    fontWeight: 800,
    fontSize: utils.remConverter(12),
    lineHeight: `18px`,
    letterSpacing: `0.5px`,
  },
  T_12_Semibold: {
    fontFamily: `Lato`,
    fontStyle: `normal`,
    fontWeight: 700,
    fontSize: utils.remConverter(12),
    lineHeight: `18px`,
  },
  T_12_Regular: {
    fontFamily: `Lato`,
    fontStyle: `normal`,
    fontWeight: 500,
    fontSize: utils.remConverter(12),
    lineHeight: `18px`,
  },
  T_12_Light: {
    fontFamily: `Lato`,
    fontStyle: `normal`,
    fontWeight: 400,
    fontSize: utils.remConverter(12),
    lineHeight: `18px`,
    letterSpacing: `0.5px`,
  },
  T_10_Regular: {
    fontFamily: `Lato`,
    fontStyle: `normal`,
    fontWeight: 500,
    fontSize: utils.remConverter(10),
    lineHeight: `15px`,
    letterSpacing: `0.5px`,
  },
};

export default typography;
