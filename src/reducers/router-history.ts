import createReducer from '@utils/redux/createReducer';

export enum ActionType {
  SET_HISTORY = `SET_HISTORY`,
}

export interface State {
  history: string[];
}

const initialState: State = {
  history: [],
};

export default createReducer<State>(initialState, {
  [ActionType.SET_HISTORY](state: State, payload: string[]): State {
    return {
      ...state,
      history: payload,
    };
  },
});
