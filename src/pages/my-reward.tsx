import MyReferrals from '@components/ReferAndEarn/MyReferral';
import ReferralListCard from '@components/ReferAndEarn/ReferralListCard';
import { Header } from '@components/Shared';
import { mixins } from '@styles/shared';
import { useEffect, useState } from 'react';
import { getReferralsJourney } from '@actions/referral';
import { ReferralsData, ReferralsList } from '@typings/api/referrals';
import { useTranslate } from '@utils/useTranslate';

export default function MyReward() {
  const [rewardData, setRewardData] = useState<ReferralsList | undefined>();
  const { translate } = useTranslate();

  useEffect(() => {
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
    <section>
      <Header isBackEnabled={true} title={translate(`MY_REWARDS`)} />
      <section>
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
    </section>
  );
}
