import { FC } from 'react';
import * as styles from './styles';
import Lottie from 'react-lottie';
import * as loaderAnimation from '@public/lottie/loader.json';
import { SerializedStyles } from '@emotion/react';

interface MLottieProps {
  addStyles?: SerializedStyles;
}

const MLottie: FC<MLottieProps> = ({ addStyles }) => {
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

export default MLottie;
