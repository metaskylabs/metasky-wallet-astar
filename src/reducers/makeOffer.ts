import { NFTOfferList, previewOffer } from '@typings/api/makeOffer';
import { OfferFilter, TransactionStatus } from '@utils/constants';
import createReducer from '@utils/redux/createReducer';

export enum ActionType {
  SET_OFFER_LIST_NFT = `SET_OFFER_LIST_NFT`,
  GET_OFFER_BY_ME = `GET_OFFER_BY_ME`,
  GET_OFFER_RECEIVED_FOR_ME = `GET_OFFER_RECEIVED_FOR_ME`,
  GET_OFFER_DETAILS = `GET_OFFER_DETAILS`,
  SET_PREVIEW_OFFER = `SET_PREVIEW_OFFER`,
  SET_PAYMENT_STATUS = `SET_PAYMENT_STATUS`,
  RESET_PAYMENT_STATUS = `RESET_PAYMENT_STATUS`,
  RESET_NFT_LIST = `RESET_NFT_LIST`,
}

export interface State {
  nftOffer: {
    data: NFTOfferList[];
    sort: { key: string; direction: 'ASC' | 'DESC' }[];
  };
  offerForMe: {
    data: NFTOfferList[];
    pageNumber: number;
    sort: { key: string; direction: 'ASC' | 'DESC' }[];
    filter: {
      key: string;
      operator: string;
      value: OfferFilter.ACCEPTED | OfferFilter.ACTIVE | OfferFilter.REJECTED;
    }[];
    search: string | null;
  };
  offerReceivedForMe: {
    data: NFTOfferList[];
    pageNumber: number;
    sort: { key: string; direction: 'ASC' | 'DESC' }[];
    filter: {
      key: string;
      operator: string;
      value: OfferFilter.ACCEPTED | OfferFilter.ACTIVE | OfferFilter.REJECTED;
    }[];
    search: string | null;
  };
  offerDetails: NFTOfferList | null;
  previewOffer: previewOffer | null;
  paymentTransactionStatus: TransactionStatus | null;
}

const initialState: State = {
  nftOffer: {
    data: [],
    sort: [],
  },
  offerForMe: {
    data: [],
    pageNumber: 1,
    sort: [],
    filter: [],
    search: null,
  },
  offerReceivedForMe: {
    data: [],
    pageNumber: 1,
    sort: [],
    filter: [],
    search: null,
  },
  offerDetails: null,
  previewOffer: null,
  paymentTransactionStatus: null,
};

export default createReducer<State>(initialState, {
  [ActionType.SET_OFFER_LIST_NFT](state: State, payload: State): State {
    return {
      ...state,
      nftOffer: {
        data: payload.nftOffer.data,
        sort: payload.nftOffer.sort,
      },
    };
  },
  [ActionType.GET_OFFER_BY_ME](state: State, payload: State): State {
    return {
      ...state,
      offerForMe: {
        data: payload.offerForMe.data,
        pageNumber: payload.offerForMe.pageNumber,
        sort: payload.offerForMe.sort,
        filter: payload.offerForMe.filter,
        search: payload.offerForMe.search,
      },
    };
  },
  [ActionType.GET_OFFER_RECEIVED_FOR_ME](state: State, payload: State): State {
    return {
      ...state,
      offerReceivedForMe: {
        data: payload.offerReceivedForMe.data,
        pageNumber: payload.offerReceivedForMe.pageNumber,
        sort: payload.offerReceivedForMe.sort,
        filter: payload.offerReceivedForMe.filter,
        search: payload.offerReceivedForMe.search,
      },
    };
  },
  [ActionType.GET_OFFER_DETAILS](state: State, payload: State): State {
    return {
      ...state,
      offerDetails: payload.offerDetails,
    };
  },
  [ActionType.SET_PREVIEW_OFFER](state: State, payload: State): State {
    return {
      ...state,
      previewOffer: payload.previewOffer,
    };
  },
  [ActionType.SET_PAYMENT_STATUS](state: State, payload: State): State {
    return {
      ...state,
      paymentTransactionStatus: payload.paymentTransactionStatus,
    };
  },
  [ActionType.RESET_PAYMENT_STATUS](state: State, payload: State): State {
    return {
      ...state,
      paymentTransactionStatus: null,
    };
  },
  [ActionType.RESET_NFT_LIST](state: State, payload: State): State {
    return {
      ...state,
      nftOffer: {
        data: [],
        sort: [],
      },
    };
  },
});
