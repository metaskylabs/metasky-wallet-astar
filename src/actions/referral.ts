import { Dispatch } from '@utils/redux/dispatch';
import createActions from '@utils/redux/createActions';
import { ApiV1 } from './Axios';
import { ActionType } from '@reducers/referral';
import { MetaskyAPIWrap } from '@typings/api/wrapper';
import {
  ReferralConfig,
  ReferralsData,
  ReferralsList,
} from '@typings/api/referrals';

export const getReferralsJourney = async (): Promise<
  MetaskyAPIWrap<ReferralsList>
> => {
  const response = await ApiV1.get(`/rewards/fetchRewards`);
  return response.data;
};

export const getReferralLink = async () => {
  return createActions(`referralLink`, async (dispatch: Dispatch) => {
    const response = await ApiV1.get(`/rewards/fetchInviteLink`);
    dispatch({
      type: ActionType.SET_REFERRAL_LINK,
      payload: response.data.data.url,
    });
    dispatch({
      type: ActionType.SET_REFERRAL_CONFIG,
      payload: {
        hasRewards: response?.data?.data?.hasRewards,
        isActive: response?.data?.data?.isActive,
      } as ReferralConfig,
    });
  });
};
