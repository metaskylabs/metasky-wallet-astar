import AssetsImg from '@public/images';
import { mixins } from '@styles/shared';
import { motion } from 'framer-motion';
import { FC } from 'react';
import * as styles from './styles';

const EmptyBenefits: FC = () => {
  return (
    <motion.section
      css={[mixins.flexAlignJustifiedCenter, mixins.flexColumn]}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.1,
        default: { duration: 0.3 },
        ease: `easeOut`,
      }}
    >
      <img src={AssetsImg.ic_nftEmpty.src} alt="Empty Transaction" />
      <h2 css={styles.emptyTransactionHeader}>No Benefits found.</h2>
      <p css={styles.emptyTransactionDescription}>
        You have no benefits in this wallet.
      </p>
    </motion.section>
  );
};

export default EmptyBenefits;
