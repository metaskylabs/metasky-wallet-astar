import createReducer from '@utils/redux/createReducer';

export enum ActionType {
  SET_INTERCOM_UNREAD_MESSAGES = `SET_INTERCOM_UNREAD_MESSAGES`,
}

export interface State {
  unReadMessagesCount: number;
}

const initialState: State = {
  unReadMessagesCount: 0,
};

export default createReducer<State>(initialState, {
  [ActionType.SET_INTERCOM_UNREAD_MESSAGES](
    state: State,
    payload: number,
  ): State {
    return {
      ...state,
      unReadMessagesCount: payload,
    };
  },
});
