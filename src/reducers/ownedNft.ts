import { NftList } from '@typings/api/nftList';
import createReducer from '@utils/redux/createReducer';

export enum ActionType {
  SET_NFT_LIST = `SET_NFT_LIST`,
  RESET_NFT_LIST = `RESET_NFT_LIST`,
}

export interface State {
  list: NftList[];
}

const initialState: State = {
  list: [],
};

export default createReducer<State>(initialState, {
  [ActionType.SET_NFT_LIST](state: State, payload: NftList[]): State {
    return {
      ...state,
      list: payload,
    };
  },
  [ActionType.RESET_NFT_LIST](): State {
    return {
      list: [],
    };
  },
});
