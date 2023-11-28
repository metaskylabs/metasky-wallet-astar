import { FC, useEffect, useState } from 'react';
import * as styles from './styles';
import AssetsImg from '@public/images';

interface AnimationCustomNayaabLoaderProps {
  orderId?: string;
}

const AnimationEggHatch: FC<AnimationCustomNayaabLoaderProps> = ({
  orderId,
}) => {
  return (
    <div css={styles.mainContainer}>
      {/*<Lottie options={animationData} />*/}
      <img css={styles.animationContainer} src={AssetsImg.g_anda_hatch.src} />
    </div>
  );
};

export default AnimationEggHatch;
