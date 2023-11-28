import * as styles from './styles';
import Lottie from 'react-lottie';
import { motion } from 'framer-motion';
import { FC, useEffect } from 'react';
import AssetsImg from '@public/images';
import { useSelector } from 'react-redux';
import { StoreState } from '@reducers';
import { State as utilsState } from '@reducers/utils';
import { setSplashScreenAppeared } from '@actions/auth';

const Splashscreen = () => {
  const utils = useSelector<StoreState, utilsState>((state) => state.utils);
  const checkOptions = {
    loop: false,
    autoplay: true,
    animationData: AssetsImg.l_loder_logo,
    resizeMode: `contain`,
    rendererSettings: {
      preserveAspectRatio: `xMidYMid slice`,
    },
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setSplashScreenAppeared(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (!utils.isSplashScreen) {
    return (
      <motion.div
        css={styles.splashScreenContainer}
        initial={{ y: 0 }}
        animate={{ y: `-100%` }}
        transition={{
          delay: 3,
          default: { duration: 0.3 },
          ease: `easeIn`,
        }}
      >
        <article css={styles.checkAnimation}>
          <Lottie options={checkOptions} />
        </article>
      </motion.div>
    );
  } else {
    return null;
  }
};

export default Splashscreen;
