import { colors, typography, utils } from '@styles/shared';
import { css } from '@emotion/react';
import AssetsImg from '@public/images';

export const container = css({
  background: colors.Secondary_White,
  boxShadow: colors.Shadow_Input_Inner_Hover,
  borderRadius: 50,
  height: 70,
  overflow: `hidden`,
  padding: `0 10px`,
  position: `relative`,
  // padding: `0 37px 0 37px`,
  '.rc-slider-handle,.rc-slider-handle:hover,.rc-slider-handle:active': {
    border: `none !important`,
    boxShadow: `none !important`,
  },
  '.rc-slider-handle::after': {
    content: `""`,
    width: 10,
    height: 20,
    position: `absolute`,
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%,-50%)`,
    backgroundImage: `url(${AssetsImg.ic_arrow_forward_black.src})`,
    backgroundRepeat: `no-repeat`,
  },
  '.rc-slider-disabled': {
    background: `transparent`,
  },
});

export const slideInfoText = css({
  position: `absolute`,
  left: `50%`,
  top: `50%`,
  transform: `translate(-50%,-50%)`,
  ...typography.T_20_Semibold,
  color: colors.Grey_Text,
  whiteSpace: `nowrap`,
});
export const slideLoadingText = css({
  position: `absolute`,
  left: `50%`,
  top: `50%`,
  transform: `translate(-50%,-50%)`,
  ...typography.T_20_Semibold,
  color: colors.Secondary_Black_Text,
});
export const handleStyle = {
  height: 59,
  width: 59,
  borderWidth: 0,
  background: `transparent`,
  marginTop: 1,
  opacity: 1,
  transform: `translateX(0)`,
};
export const trackStyle = {
  backgroundImage: colors.Gradient_Yellow,
  height: 59,
  minWidth: 59,
  borderRadius: 50,
};

export const railStyle = {
  height: 59,
  background: `transparent`,
};
