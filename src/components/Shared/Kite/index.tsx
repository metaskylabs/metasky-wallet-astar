import { FC } from 'react';
import * as styles from './styles';
import Lottie from 'react-lottie';
import * as loaderAnimation from '@public/lottie/kiteAnimation.json';
import { SerializedStyles } from '@emotion/react';

interface KiteProps {
  addStyles?: SerializedStyles;
}

const Kite: FC<KiteProps> = ({ addStyles }) => {
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

export default Kite;
