import { colors, typography, utils } from '@styles/shared';
import { css } from '@emotion/react';

export const container = css({
  margin: `0 ${utils.remConverter(2)}`,
  borderRadius: 5,
});

export const input = css({
  width: `100%`,
  height: `52px`,
  padding: `12px`,
  color: colors.Primary_Blue,
  backgroundColor: colors.Primary_Bg_Grey,
  boxShadow: `inset -2px -2px 10px #FAFBFF, inset 2px 2px 10px #C6C9D3`,
  borderRadius: `10px`,
  border: `0`,
  ...typography.T_20_Regular,
  textAlign: `center`,
  '&: focus': {
    outlineColor: colors.Primary_Blue,
  },
});
