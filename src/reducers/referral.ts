import {
  ReferralConfig,
  ReferralsList,
  ReferralsReward,
} from '@typings/api/referrals';
import createReducer from '@utils/redux/createReducer';

export enum ActionType {
  GET_REFERRALS_JOURNEY = `GET_REFERRALS_JOURNEY`,
  GET_REFFERALS_REWARD_DATA = `GET_REFFERALS_REWARD_DATA`,
  SET_REFERRAL_LINK = `SET_REFERRAL_LINK`,
  SET_REFERRAL_CONFIG = `SET_REFERRAL_CONFIG`,
}

export interface State {
  journeyList: ReferralsList[];
  data: ReferralsReward | null;
  link: string | null;
  config: ReferralConfig;
}

const initialState: State = {
  journeyList: [],
  data: null,
  link: null,
  config: {
    hasRewards: false,
    isActive: false,
  },
};

export default createReducer<State>(initialState, {
  [ActionType.GET_REFERRALS_JOURNEY](
    state: State,
    payload: ReferralsList[],
  ): State {
    return {
      ...state,
      journeyList: payload,
    };
  },
  [ActionType.GET_REFFERALS_REWARD_DATA](
    state: State,
    payload: ReferralsReward,
  ): State {
    return {
      ...state,
      data: payload,
    };
  },
  [ActionType.SET_REFERRAL_LINK](state: State, payload: string) {
    return {
      ...state,
      link: payload,
    };
  },
  [ActionType.SET_REFERRAL_CONFIG](state: State, payload: ReferralConfig) {
    return {
      ...state,
      config: {
        hasRewards: payload.hasRewards || false,
        isActive: payload.isActive || false,
      },
    };
  },
});
