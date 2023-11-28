import ShimmerCard from '@components/Shimmer/ShimmerCard';
import { FC } from 'react';
import * as styles from './styles';

const ShimmerLargeImage: FC = () => {
  return (
    <ShimmerCard
      addStyles={styles.shimmerCard}
      borderRadius={4}
      isEffect={true}
    />
  );
};

export default ShimmerLargeImage;
