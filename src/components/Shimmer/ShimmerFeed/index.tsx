import ShimmerCard from '@components/Shimmer/ShimmerCard';
import { FC } from 'react';
import * as styles from './styles';
import { motion } from 'framer-motion';

const ShimmerFeed: FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.3,
        default: { duration: 0.3 },
        ease: `easeIn`,
      }}
    >
      <ShimmerCard addStyles={styles.shimmerCard} isEffect={true} />
    </motion.div>
  );
};

export default ShimmerFeed;
