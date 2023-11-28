import { FC, Fragment } from 'react';
import * as styles from './styles';
import AssetsImg from '@public/images';
import { motion } from 'framer-motion';
import { mixins } from '@styles/shared';

const ComingSoon: FC = () => {
  return (
    <Fragment>
      <motion.div
        css={[styles.iconContainer, mixins.flexAlignJustifiedCenter]}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.1,
          default: { duration: 0.5 },
          ease: `easeIn`,
        }}
      >
        <img
          src={AssetsImg.ic_nftRocket.src}
          alt="Coming soon"
          width="100%"
          height="100%"
          css={styles.commingSoonIcon}
        />
      </motion.div>
      <motion.div
        css={styles.successContentWrapper}
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.2,
          default: { duration: 0.5 },
          ease: `easeIn`,
        }}
      >
        <h2 css={styles.successTitle}>Coming Soon!</h2>
        <p css={styles.successDescription}>
          Something awesome is in the works. Stay tuned to experience transfer
          of NFTs soon.
        </p>
      </motion.div>
    </Fragment>
  );
};

export default ComingSoon;
