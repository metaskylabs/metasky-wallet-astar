import { WalletAnnouncementResponse } from '@typings/api/wallet';
import createReducer from '@utils/redux/createReducer';

export enum ActionType {
  SET_ANNOUNCEMENT_DATA = `SET_ANNOUNCEMENT_DATA`,
  RESET_ANNOUNCEMENT_DATA = `RESET_ANNOUNCEMENT_DATA`,
}

export interface State {
  list: WalletAnnouncementResponse[];
}

const initialState: State = {
  list: [],
};

export default createReducer<State>(initialState, {
  [ActionType.SET_ANNOUNCEMENT_DATA](
    state: State,
    payload: WalletAnnouncementResponse[],
  ): State {
    return {
      ...state,
      list: payload,
    };
  },
  [ActionType.RESET_ANNOUNCEMENT_DATA](): State {
    return {
      list: [],
    };
  },
});
