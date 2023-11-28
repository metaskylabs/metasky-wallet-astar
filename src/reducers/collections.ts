import { CollectionList } from '@typings/api/collectionList';
import createReducer from '@utils/redux/createReducer';

export enum ActionType {
  SET_COLLECTION_LIST = `SET_COLLECTION_LIST`,
}

export interface State {
  list: CollectionList[];
}

const initialState: State = {
  list: [],
};

export default createReducer<State>(initialState, {
  [ActionType.SET_COLLECTION_LIST](
    state: State,
    payload: CollectionList[],
  ): State {
    return {
      ...state,
      list: payload,
    };
  },
});
