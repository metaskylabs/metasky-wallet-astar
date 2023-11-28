import { colors } from '@styles/shared';
import { FeedType } from '@typings/api/feed';
import { FC } from 'react';
import * as styles from './styles';
import { motion } from 'framer-motion';
interface ProgressBarProps {
  currentFeedIndex: number;
  feeds: FeedType[];
}

const ProgressBar: FC<ProgressBarProps> = ({ currentFeedIndex, feeds }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        default: { duration: 0.5 },
        ease: `easeIn`,
      }}
      css={styles.progressBarContainer}
    >
      {feeds.map((feed, index) => (
        <div css={[styles.progressBar]} key={feed.feed_uuid}>
          <div css={[currentFeedIndex >= index && styles.bgBlue]}></div>
        </div>
      ))}
    </motion.div>
  );
};

export default ProgressBar;
