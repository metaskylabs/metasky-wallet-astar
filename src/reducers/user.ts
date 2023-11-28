import { BalanceSummary, UserProfileResponse } from '@typings/api/profile';
import createReducer from '@utils/redux/createReducer';

export enum ActionType {
  SET_USER_PROFILE = `SET_USER_PROFILE`,
  SET_USER_LOGIN = `SET_USER_LOGIN`,
  RESET_USER_PROFILE = `RESET_USER_PROFILE`,
  SET_USER_SUMMARY = `SET_USER_SUMMARY`,
}

export interface State {
  profile: UserProfileResponse | null;
  isLogin: boolean;
  summary: BalanceSummary | null;
}

const initialState: State = {
  profile: null,
  isLogin: false,
  summary: null,
};

export default createReducer<State>(initialState, {
  [ActionType.SET_USER_PROFILE](
    state: State,
    payload: UserProfileResponse,
  ): State {
    return {
      ...state,
      profile: payload,
    };
  },
  [ActionType.SET_USER_LOGIN](state: State, payload: boolean): State {
    return {
      ...state,
      isLogin: payload,
    };
  },
  [ActionType.RESET_USER_PROFILE](): State {
    return {
      profile: null,
      isLogin: false,
      summary: null,
    };
  },
  [ActionType.SET_USER_SUMMARY](state: State, payload: BalanceSummary): State {
    return {
      ...state,
      summary: payload,
    };
  },
});
