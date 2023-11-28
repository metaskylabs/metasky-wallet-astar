import { useEffect, useState } from 'react';
import { ReferralsList } from '@typings/api/referrals';
import { getReferralsJourney } from '@actions/referral';
import MyReferrals from '@components/ReferAndEarn/MyReferral';
import { mixins } from '@styles/shared';
import ReferralListCard from '@components/ReferAndEarn/ReferralListCard';
import * as styles from './styles';
import { useAnalytics } from '@utils/useAnalytics';
import { EVENT_PAGE } from '@constants/analytics';

export default function MyReward() {
  const [rewardData, setRewardData] = useState<ReferralsList | undefined>();
  const { trackPage } = useAnalytics();

  useEffect(() => {
    trackPage(EVENT_PAGE.MY_REWARDS);
    fetchRewardData();
  }, []);

  const fetchRewardData = async () => {
    try {
      const listData = await getReferralsJourney();
      setRewardData(listData?.data);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <section css={styles.container}>
      <MyReferrals
        totalRewardAmount={
          rewardData?.total_reward_amount
            ? rewardData?.total_reward_amount
            : `0`
        }
        totalUserJoined={
          rewardData?.total_user_joined ? rewardData?.total_user_joined : 0
        }
      />
      <div css={[{ gap: 24 }, mixins.flexColumn]}>
        {rewardData?.rewards &&
          rewardData.rewards.map((details, i) => (
            <div key={i}>
              <ReferralListCard data={details} />
            </div>
          ))}
      </div>
    </section>
  );
}
