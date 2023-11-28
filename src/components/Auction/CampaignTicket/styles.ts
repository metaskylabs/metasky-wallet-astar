import { css } from '@emotion/react';
import { colors, typography, utils } from '@styles/shared';

export const button = css({
  background: colors.Primary_Yellow,
  boxShadow: colors.Shadow_Btn_P_Outer_Sharp,
  borderRadius: `50px`,
  padding: `12px`,
  width: `100%`,
  border: `0`,
  color: colors.Secondary_Black_Text,
  ...typography.T_20_Bold,
  marginTop: utils.remConverter(28),
});

export const rowContainer = css({
  margin: `0 ${utils.remConverter(16)}`,
  position: `relative`,
});

export const ticketList = css({
  display: `flex`,
  flexDirection: `column`,
  gap: utils.remConverter(24),
  paddingBottom: `${utils.remConverter(24)}`,
});

export const ticketContainer = css({
  boxShadow: colors.Shadow_Card_Outer_Smooth,
  padding: utils.remConverter(16),
  borderRadius: utils.remConverter(4),
  position: `relative`,
});

export const rightCut = css({
  position: `absolute`,
  right: utils.remConverter(-15),
  top: `calc(50% + 1rem)`,
  width: utils.remConverter(30),
  height: utils.remConverter(50),
  borderRadius: `50% 0 0 50%`,
  backgroundColor: colors.Primary_Bg_Grey,
  boxShadow: colors.Shadow_Input_Inner_Lighter,
});

export const leftCut = css({
  position: `absolute`,
  left: utils.remConverter(-15),
  top: `calc(50% + 1rem)`,
  width: utils.remConverter(30),
  height: utils.remConverter(50),
  borderRadius: `0 50% 50% 0`,
  backgroundColor: colors.Secondary_White,
});

export const ticketImg = css({
  width: `100%`,
  aspectRatio: `1`,
});

export const ticketName = css({
  ...typography.T_24_Bold,
  margin: `${utils.remConverter(28)} 0`,
  textAlign: `center`,
});

export const border = css({
  borderTop: `2px dashed ${colors.Grey_Border}`,
  marginBottom: utils.remConverter(18),
});

export const ticketBenefitsList = css({
  display: `flex`,
  flexDirection: `column`,
  gap: utils.remConverter(23),
});

export const ticketBenefitItem = css({});

export const ticketBenefitItemIcon = css({
  width: utils.remConverter(20),
  height: utils.remConverter(20),
  marginRight: utils.remConverter(18),
});

export const ticketBenefitItemText = css({
  ...typography.T_14_Regular,
});
