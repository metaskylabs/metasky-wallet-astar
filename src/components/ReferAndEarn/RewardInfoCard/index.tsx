import AssetsImg from '@public/images';
import * as styles from './styles';
import React, { FC } from 'react';
import { colors, mixins, typography, utils } from '@styles/shared';

interface RewardInfoCardProps {
  count: string;
  image: string;
  message: string;
}

const RewardInfoCard: FC<RewardInfoCardProps> = ({ count, message, image }) => {
  return (
    <section css={[styles.container, mixins.flexColumn]}>
      <div css={styles.iconContainer}>
        <img src={image} alt="" />
      </div>
      <h4 css={styles.count}>{count}</h4>
      <p css={styles.mesage}>{message}</p>
    </section>
  );
};

export default RewardInfoCard;
