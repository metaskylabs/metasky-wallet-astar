import { css, keyframes } from '@emotion/react';
import { utils } from '@styles/shared';

const placeholderShimmer = keyframes`
  0% {
    background-position: -500px 0;
  }
  100% {
    background-position: 500px 0;
  }
`;
export const container = css({});
export const shine = css({
  background: `#DAE0EE`,
  backgroundImage: `linear-gradient(46.44deg, rgba(255, 255, 255, 0) 21.12%, rgba(241, 241, 241, 0.216667) 36.11%, rgba(247, 245, 245, 0.545833) 56.59%, rgba(255, 255, 255, 0.8) 76.48%)`,
  backgroundRepeat: `no-repeat`,
  position: `relative`,
  display: `inline-block`,
  backgroundSize: `1200px 500px`,
  animation: `${placeholderShimmer} 1s linear infinite`,
  animationFillMode: `forwards`,
  WebkitAnimationDuration: `1s`,
  WebkitAnimationFillMode: `forwards`,
  WebkitAnimationIterationCount: `infinite`,
  WebkitAnimationName: placeholderShimmer,
  WebkitAnimationTimingFunction: `linear`,
  width: `100%`,
});
