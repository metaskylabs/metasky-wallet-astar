import { css } from '@emotion/react';
import { colors, typography, utils } from '@styles/shared';

export const filterWrapper = css({
  height: `100%`,
});

export const nftHeader = css({
  padding: `${utils.remConverter(20)} ${utils.remConverter(16)}`,
});

export const nftTitle = css({
  ...typography.T_20_Bold,
  width: `75%`,
  textAlign: `center`,
});

export const filterSortBy = css({
  ...typography.T_16_Semibold,
  color: colors.Secondary_Black_Text,
  margin: `0 ${utils.remConverter(16)}`,
});

export const filterSortByContainer = css({
  overflowX: `scroll`,
});

export const chipWrapperProperties = css({
  width: utils.remConverter(151),
});

export const chipPropertiesIcon = css({
  marginLeft: utils.remConverter(10),
  '& > span': {
    width: `${utils.remConverter(16)} !important`,
    height: `${utils.remConverter(16)} !important`,
  },
});

export const chipWrapperDesc = css({
  backgroundColor: colors.Primary_Bg_Grey,
});

export const chipTextDesc = css({
  color: colors.Secondary_Black_Text,
});

export const filterBottomWrapper = css({
  boxShadow: colors.Shadow_Btn_Box,
  backgroundColor: colors.Secondary_White,
  position: `sticky`,
  bottom: 0,
  width: `100%`,
  height: utils.remConverter(86),
});

export const filterReset = css({
  ...typography.T_16_Bold,
  width: `50%`,
  margin: utils.remConverter(16),
});

export const filterApply = css({
  ...typography.T_16_Bold,
  width: `50%`,
  margin: `${utils.remConverter(16)} ${utils.remConverter(
    16,
  )} ${utils.remConverter(16)} 0`,
});

export const filterAccordion = css({
  height: `75vh`,
});

export const divider = css({
  border: `${utils.remConverter(1)} solid ${colors.Grey_Border}`,
  margin: 0,
});

export const filterAccordionContainer = css({
  margin: `0 ${utils.remConverter(16)}`,
});

export const filterAccordionPanel = css({
  margin: `${utils.remConverter(16)} 0`,
});

export const filterAccordionTitle = css({
  ...typography.T_16_Semibold,
  width: `80%`,
});

export const filterAccordionIcon = css({
  width: utils.remConverter(24),
  height: utils.remConverter(24),
});

export const filterAccordionOptions = css({
  '& > .inputCheckbox': {
    display: `none`,
  },
  '& > .filterCheckbox': {
    width: utils.remConverter(24),
    height: utils.remConverter(24),
    borderRadius: utils.remConverter(4),
    boxShadow: colors.Shadow_Card_Outer_Sharp2,
    color: colors.Primary_Bg_Grey,
  },
  '& > .filterCheckbox::after': {
    content: `"✓"`,
    color: colors.Primary_Bg_Grey,
    display: `flex`,
    alignItems: `center`,
    justifyContent: `center`,
  },
  '& > .inputCheckbox:checked + .filterCheckbox': {
    backgroundColor: colors.Primary_Blue,
  },
});

export const filterCheckboxLabel = css({
  ...typography.T_16_Regular,
  color: colors.Secondary_Black_Text,
  margin: `${utils.remConverter(16)} 0 ${utils.remConverter(
    16,
  )} ${utils.remConverter(24)}`,
});
