import { GetUpdatesResponse } from '@typings/api/update';
import createReducer from '@utils/redux/createReducer';

export enum ActionType {
  SET_USER_UPDATES = `SET_USER_UPDATES`,
}

export interface State {
  list: Array<GetUpdatesResponse> | null;
  unReadMessage: boolean;
}

const initialState: State = {
  list: null,
  unReadMessage: false,
};

export default createReducer<State>(initialState, {
  [ActionType.SET_USER_UPDATES](state: State, payload: State): State {
    return {
      ...state,
      list: payload.list,
      unReadMessage: payload.unReadMessage,
    };
  },
});
