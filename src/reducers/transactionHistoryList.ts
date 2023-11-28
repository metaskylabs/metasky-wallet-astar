import { TransactionDetails } from '@typings/api/wallet';
import createReducer from '@utils/redux/createReducer';

export enum ActionType {
  SET_TXN_HISTORY_DATA = `SET_TXN_HISTORY_DATA`,
  SET_PAGE_META_DATA = `SET_PAGE_META_DATA`,
  CLEAR_HISTORY = `CLEAR_HISTORY`,
}

export type State = {
  txn_list: TransactionDetails[] | null;
  clickID: null | string;
  loadCounter: number;
  loadCounterPrev: number;
};

const initialState: State = {
  txn_list: null,
  clickID: null,
  loadCounter: 1,
  loadCounterPrev: 1,
};

export default createReducer<State>(initialState, {
  [ActionType.SET_TXN_HISTORY_DATA](
    state: State,
    payload: {
      txn_data: TransactionDetails[];
      loadCounter: number;
      loadCounterPrev: number;
      state: 'PREV' | 'NEXT';
    },
  ): State {
    if (state.txn_list === null) {
      state.txn_list = payload.txn_data;
    } else {
      if (payload.state === `NEXT`) {
        state.txn_list = state.txn_list.concat(payload.txn_data);
      } else {
        state.txn_list = payload.txn_data.concat(state.txn_list);
      }
    }
    state.loadCounter = payload.loadCounter;
    state.loadCounterPrev = payload.loadCounterPrev;
    return state;
  },
  [ActionType.SET_PAGE_META_DATA](
    state: State,
    payload: { clickID: string | null; pageId: number; pageIdPrev: number },
  ): State {
    state.clickID = payload.clickID;
    state.loadCounter = payload.pageId;
    state.loadCounterPrev = payload.pageIdPrev;
    return state;
  },
  [ActionType.CLEAR_HISTORY](state: State): State {
    state.txn_list = null;
    state.loadCounterPrev = state.loadCounter;
    return state;
  },
});
