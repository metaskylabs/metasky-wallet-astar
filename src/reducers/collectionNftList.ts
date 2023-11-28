import { CollectionNftList } from '@typings/api/collectionNftList';
import createReducer from '@utils/redux/createReducer';

export enum ActionType {
  SET_COLLECTION_NFT_LIST = `SET_COLLECTION_NFT_LIST`,
}

export interface State {
  list: {
    count: number | null;
    listing: CollectionNftList[];
  };
  pageNumber: number;
  sort: { key: string; value: 'ASC' | 'DESC' }[];
  isLoadMoreEnabled: boolean;
  name: string;
  id: string;
  image: string | null;
  media_type: string;
  size: number;
  description: string;
  creator: string;
  additional_data?: {
    event_details?: { [key: string]: string };
    terms_and_conditions?: string;
  };
}

const initialState: State = {
  list: {
    count: null,
    listing: [],
  },
  pageNumber: 0,
  sort: [],
  isLoadMoreEnabled: true,
  name: ``,
  id: ``,
  image: ``,
  media_type: ``,
  size: 0,
  description: ``,
  creator: `string`,
  additional_data: {},
};

export default createReducer<State>(initialState, {
  [ActionType.SET_COLLECTION_NFT_LIST](state: State, payload: State): State {
    return {
      ...state,
      list: payload.list,
      pageNumber: payload.pageNumber,
      sort: payload.sort,
      isLoadMoreEnabled: payload.isLoadMoreEnabled,
      name: payload.name,
      id: payload.id,
      size: payload.size,
      description: payload.description,
      image: payload.image,
      media_type: payload.media_type,
      creator: payload.creator,
      additional_data: payload.additional_data,
    };
  },
});
