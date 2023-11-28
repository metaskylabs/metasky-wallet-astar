import { FC } from 'react';
import * as styles from './styles';
import Lottie from 'react-lottie';
import * as loaderAnimation from '@public/lottie/blueButtonLoader.json';
import { SerializedStyles } from '@emotion/react';

interface MSecondaryLottieProps {
  addStyles?: SerializedStyles;
}

const MSecondaryLottie: FC<MSecondaryLottieProps> = ({ addStyles }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loaderAnimation,
  };

  return (
    <div css={[styles.loader, { ...addStyles }]}>
      <Lottie options={defaultOptions} />
    </div>
  );
};

export default MSecondaryLottie;
