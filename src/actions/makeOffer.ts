import {
  AcceptOfferRespone,
  DeleteOfferRespone,
  MakeOfferPayload,
  MakeOfferRespone,
  NFTOfferListPayload,
  NFTOfferPayload,
  RejectOfferRespone,
} from '@typings/api/makeOffer';
import { MetaskyAPIWrap } from '@typings/api/wrapper';
import createActions from '@utils/redux/createActions';
import { Dispatch } from '@utils/redux/dispatch';
import { ApiV1 } from './Axios';
import { ActionType } from '@reducers/makeOffer';
import { OfferFilter } from '@utils/constants';

export const makeOffer = async (
  payload: MakeOfferPayload,
): Promise<MetaskyAPIWrap<MakeOfferRespone>> => {
  const response = await ApiV1.post(`auction`, payload);
  return response.data;
};

export const paymentStatus = async (orderID: string) => {
  return createActions(
    `paymentStatus`,
    async (dispatch: Dispatch) => {
      const response = await ApiV1.get(`payment/status/${orderID}`);
      dispatch({
        type: ActionType.SET_PAYMENT_STATUS,
        payload: {
          paymentTransactionStatus: response.data.data.status,
        },
      });
    },
    (err) => {
      throw err.response;
    },
  );
};

export const deleteOffer = async (
  autionId: string,
): Promise<MetaskyAPIWrap<DeleteOfferRespone>> => {
  const response = await ApiV1.delete(`auction/${autionId}`);
  return response.data;
};

export const rejectOffer = async (
  autionId: string,
): Promise<MetaskyAPIWrap<RejectOfferRespone>> => {
  const response = await ApiV1.put(`auction/reject/${autionId}`);
  return response.data;
};

export const acceptOffer = async (
  autionId: string,
): Promise<MetaskyAPIWrap<AcceptOfferRespone>> => {
  const response = await ApiV1.put(`auction/accept/${autionId}`);
  return response.data;
};

export const getNFTMeOfferList = async (payload: NFTOfferListPayload) => {
  return createActions(
    `nftOfferListStatus`,
    async (dispatch: Dispatch) => {
      const response = await ApiV1.get(
        `auction/nft/me/${payload.nftId}?sort=${JSON.stringify(
          payload.sort,
        )}&pageNumber=1&pageSize=100`,
      );
      dispatch({
        type: ActionType.SET_OFFER_LIST_NFT,
        payload: {
          nftOffer: {
            data: response.data.data,
            sort: payload.sort,
          },
        },
      });
    },
    (err) => {
      throw err.response;
    },
  );
};

export const getNFTOfferList = async (payload: NFTOfferListPayload) => {
  return createActions(
    `nftOfferListStatus`,
    async (dispatch: Dispatch) => {
      const response = await ApiV1.get(
        `auction/nft/${payload.nftId}?sort=${JSON.stringify(
          payload.sort,
        )}&pageNumber=1&pageSize=100`,
      );
      dispatch({
        type: ActionType.SET_OFFER_LIST_NFT,
        payload: {
          nftOffer: {
            data: response.data.data,
            sort: payload.sort,
          },
        },
      });
    },
    (err) => {
      throw err.response;
    },
  );
};

export const getOfferByMe = async (payload: NFTOfferPayload) => {
  return createActions(
    `offerListByMeStatus`,
    async (dispatch: Dispatch) => {
      const response = await ApiV1.get(
        `auction/offers/me?sort=${JSON.stringify(
          payload.sort,
        )}&filters=${JSON.stringify(payload.filter)}&search=${
          payload.search
        }&pageNumber=${payload.pageNumber}&pageSize=100`,
      );
      dispatch({
        type: ActionType.GET_OFFER_BY_ME,
        payload: {
          offerForMe: {
            data: response.data.data,
            pageNumber:
              response.data.data.length === 0
                ? payload.pageNumber - 1
                : payload.pageNumber,
            sort: payload.sort,
            filter: payload.filter,
            search: payload.search,
          },
        },
      });
    },
    (err) => {
      throw err.response;
    },
  );
};

export const getOfferReceivedForMe = async (payload: NFTOfferPayload) => {
  return createActions(
    `offerReceivedByMeStatus`,
    async (dispatch: Dispatch) => {
      const response = await ApiV1.get(
        `auction/offers?sort=${JSON.stringify(
          payload.sort,
        )}&filters=${JSON.stringify(payload.filter)}&search=${
          payload.search
        }&pageNumber=${payload.pageNumber}&pageSize=100`,
      );
      dispatch({
        type: ActionType.GET_OFFER_RECEIVED_FOR_ME,
        payload: {
          offerReceivedForMe: {
            data: response.data.data,
            pageNumber:
              response.data.data.length === 0
                ? payload.pageNumber - 1
                : payload.pageNumber,
            sort: payload.sort,
            filter: payload.filter,
            search: payload.search,
          },
        },
      });
    },
    (err) => {
      throw err.response;
    },
  );
};

export const getOfferDetails = async (offerId: string) => {
  return createActions(
    `offerDetailStatus`,
    async (dispatch: Dispatch) => {
      const response = await ApiV1.get(`auction/${offerId}`);
      dispatch({
        type: ActionType.GET_OFFER_DETAILS,
        payload: {
          offerDetails: response.data.data,
        },
      });
    },
    (err) => {
      throw err.response;
    },
  );
};

export const getPreviewOffer = async (offerId: string) => {
  return createActions(
    `preivewOfferStatus`,
    async (dispatch: Dispatch) => {
      const response = await ApiV1.get(`auction/preview/${offerId}`);
      dispatch({
        type: ActionType.SET_PREVIEW_OFFER,
        payload: {
          previewOffer: response.data.data,
        },
      });
    },
    (err) => {
      throw err.response;
    },
  );
};

export const resetPaymentStatus = async () => {
  return createActions(`resetPaymentStatus`, async (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.RESET_PAYMENT_STATUS,
    });
  });
};

export const resetNFTOfferList = async () => {
  return createActions(`resetNFTOfferList`, async (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.RESET_NFT_LIST,
    });
  });
};
