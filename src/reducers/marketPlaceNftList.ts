import { MarketPlaceNftList } from '@typings/api/marketPlaceNftList';
import createReducer from '@utils/redux/createReducer';

export enum ActionType {
  SET_MARKETPLACE_NFT_LIST = `SET_MARKETPLACE_NFT_LIST`,
}

export interface collection {
  name: string;
  id: string;
  image: string | null;
  media_type: string;
  size: number;
  description: string;
  creator: string;
}
export interface State {
  list: {
    count: number | null;
    listing: MarketPlaceNftList[];
  };
  pageNumber: number;
  sort: { key: string; value: 'ASC' | 'DESC' }[];
  isLoadMoreEnabled: boolean;
  collections: collection[];
}

const initialState: State = {
  list: {
    count: null,
    listing: [],
  },
  pageNumber: 0,
  sort: [],
  isLoadMoreEnabled: true,
  collections: [],
};

export default createReducer<State>(initialState, {
  [ActionType.SET_MARKETPLACE_NFT_LIST](state: State, payload: State): State {
    return {
      ...state,
      list: payload.list,
      pageNumber: payload.pageNumber,
      sort: payload.sort,
      isLoadMoreEnabled: payload.isLoadMoreEnabled,
      collections: payload.collections,
    };
  },
});
