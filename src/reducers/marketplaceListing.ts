import { NftList } from '@typings/api/nftList';
import createReducer from '@utils/redux/createReducer';

export enum ActionType {
  SET_MARKETPLACE_LIST = `SET_MARKETPLACE_LIST`,
  RESET_MARKETPLACE_LIST = `RESET_MARKETPLACE_LIST`,
}

export interface State {
  list: {
    count: number | null;
    listing: NftList[];
  };
  pageNumber: number;
  sort: { key: string; value: 'ASC' | 'DESC' }[];
  isLoadMoreEnabled: boolean;
}

const initialState: State = {
  list: {
    count: null,
    listing: [],
  },
  pageNumber: 0,
  sort: [],
  isLoadMoreEnabled: true,
};

export default createReducer<State>(initialState, {
  [ActionType.SET_MARKETPLACE_LIST](state: State, payload: State): State {
    return {
      ...state,
      list: payload.list,
      pageNumber: payload.pageNumber,
      sort: payload.sort,
      isLoadMoreEnabled: payload.isLoadMoreEnabled,
    };
  },
  [ActionType.RESET_MARKETPLACE_LIST](): State {
    return {
      list: {
        count: null,
        listing: [],
      },
      pageNumber: 0,
      sort: [],
      isLoadMoreEnabled: true,
    };
  },
});
