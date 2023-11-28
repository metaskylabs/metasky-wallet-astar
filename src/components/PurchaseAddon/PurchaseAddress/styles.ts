import { colors, mixins, typography, utils } from '@styles/shared';
import { css } from '@emotion/react';

export const iconContainer = css({
  textAlign: `center`,
  width: utils.remConverter(220),
  height: utils.remConverter(220),
  margin: `${utils.remConverter(72)} auto ${utils.remConverter(24)} auto`,
  backgroundColor: colors.Grey_Border,
  borderRadius: `100%`,
});

export const commingSoonIcon = css({
  width: utils.remConverter(178),
  height: utils.remConverter(178),
});

export const successContentWrapper = css({
  textAlign: `center`,
  margin: `0 auto`,
});

export const successTitle = css({
  ...typography.T_20_Bold,
  marginBottom: utils.remConverter(8),
  color: colors.Secondary_Black_Text,
});

export const successDescription = css({
  ...typography.T_16_Regular,
  color: colors.Secondary_Black_Text,
  padding: `0 ${utils.remConverter(28)}`,
});

export const buttonContainer = css({
  width: `var(--hocWidth)`,
  background: `#F0F0F3`,
  borderTop: `1px solid ${colors.Grey_Border}`,
});

export const logoutButton = css({
  textTransform: `uppercase`,
  flex: 1,
  margin: `${utils.remConverter(17)} ${utils.remConverter(
    16,
  )} ${utils.remConverter(17)} 0`,
});

export const cancelbutton = css({
  textTransform: `uppercase`,
  flex: 1,
  margin: `${utils.remConverter(17)} ${utils.remConverter(16)}`,
});

export const swiperWrapper = css({
  '& > div': {
    padding: `${utils.remConverter(16)} ${utils.remConverter(
      16,
    )} ${utils.remConverter(16)} ${utils.remConverter(16)}`,
  },
  '.swiper-wrapper .swiper-slide:last-child': {
    marginRight: `${utils.remConverter(32)}`,
  },
});

export const title = css({
  ...typography.T_20_Bold,
  marginLeft: `1rem`,
  marginTop: `1.5rem`,
  marginBottom: `1rem`,
});

export const subtitle = css({
  ...typography.T_16_Regular,
  marginLeft: `1rem`,
});

export const divider = css({
  margin: `1rem`,
  border: `1px solid ${colors.Grey_Border}`,
});

export const nftDetailsContainer = css({
  boxShadow: colors.Shadow_Card_Outer_Smooth,
  margin: `0 ${utils.remConverter(13)}`,
  display: `flex`,
  width: `calc(100% - ${utils.remConverter(13 * 2)})`,
  // minHeight: utils.remConverter(96),
  borderRadius: 4,
});

export const searchInput = css([
  {
    ...typography.T_16_Regular,
    backgroundColor: colors.Primary_Bg_Grey,
    boxShadow: colors.Shadow_Input_Inner_Smooth,
    borderRadius: 4,
    WebkitAppearance: `none`,
    border: `none`,
    width: `100%`,
    padding: `${utils.remConverter(16)}`,
    paddingRight: utils.remConverter(38),
    resize: `none`,
    '&: focus': {
      outline: `none`,
    },
  },
  { ...mixins.placeholderTextstyle },
]);

export const addressContainer = css({
  display: `flex`,
  flexDirection: `column`,
  gap: `1rem`,
  width: `calc(100% - ${utils.remConverter(13 * 2)})`,
  margin: `1.5rem ${utils.remConverter(13)}`,
});

export const optionContainer = css({
  padding: utils.remConverter(12),
  borderRadius: 4,
  border: 0,
  position: `absolute`,
  top: `calc(100% + ${utils.remConverter(4)})`,
  left: 0,
  right: 0,
  margin: 0,
  boxShadow: colors.Shadow_Outer_Dropdown,
  backgroundColor: colors.Secondary_White,
  listStyle: `none`,
  maxHeight: utils.remConverter(240),
  zIndex: 99,
  overflowY: `auto`,
  width: `100%`,
  '&::-webkit-scrollbar': {
    display: `none`,
  },
});

export const label = css({
  ...typography.T_14_Bold,
});
