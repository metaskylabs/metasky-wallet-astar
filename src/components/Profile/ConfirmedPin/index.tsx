import * as styles from './styles';
import { FC, Fragment } from 'react';
import AssetsImg from '@public/images';
import { motion } from 'framer-motion';

const ConfirmedPin: FC = () => {
  return (
    <Fragment>
      <div css={styles.bottomSheetContainer}>
        <motion.div
          css={styles.imgContainer}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.1,
            default: { duration: 0.3 },
            ease: `easeIn`,
          }}
        >
          <img
            src={AssetsImg.ic_success.src}
            alt="green coin with tick mark"
            width="100%"
            height="100%"
          />
        </motion.div>
        <motion.div
          css={styles.textContainer}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.2,
            default: { duration: 0.3 },
            ease: `easeIn`,
          }}
        >
          <h2 css={styles.pinUpdatedTitle}>PIN Updated</h2>
          <p css={styles.subtitle}>
            You have successfully set your new PIN. Continue exploring MetaSky.
          </p>
        </motion.div>
      </div>
    </Fragment>
  );
};

export default ConfirmedPin;
