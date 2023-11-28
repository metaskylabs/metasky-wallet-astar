import { DividerLine } from '@components/Shared';
import { mixins, utils } from '@styles/shared';
import React, { FC, Fragment } from 'react';
import RewardInfoCard from '../RewardInfoCard';
import AssetsImg from '@public/images';
import { useTranslate } from '@utils/useTranslate';

interface MyReferralsProps {
  totalRewardAmount: string;
  totalUserJoined: number;
}

const MyReferrals: FC<MyReferralsProps> = ({
  totalRewardAmount,
  totalUserJoined,
}) => {
  const { translate } = useTranslate();
  return (
    <Fragment>
      <section
        css={[
          { gap: 10 },
          mixins.flexJustifiedBetween,
          utils.ml(16),
          utils.mr(16),
        ]}
      >
        <RewardInfoCard
          count={`₹${totalRewardAmount}`}
          image={AssetsImg.ic_gift.src}
          message={translate(`TOTAL_REWARDS_EARNED`)}
        />
        <RewardInfoCard
          count={`${totalUserJoined}`}
          image={AssetsImg.ic_allUsers.src}
          message={translate(`USERS_HELPED_YOU_EARN`)}
        />
      </section>
      <DividerLine />
    </Fragment>
  );
};

export default MyReferrals;
