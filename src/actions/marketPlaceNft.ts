import { Dispatch, GetState } from '@utils/redux/dispatch';
import createActions from '@utils/redux/createActions';
import { ApiV1 } from './Axios';
import { ActionType } from '@reducers/marketplaceListing';
import { MetaskyAPIWrap } from '@typings/api/wrapper';
import {
  CreateListingRequest,
  CreateListingResponse,
  DeleteListingRequest,
  GetMarketplacePreviewResponse,
  previewSaleAction,
  UpdateListingRequest,
} from '@typings/api/marketplace';
import { NftList } from '@typings/api/nftList';

export const getMarketplaceListings = async (): Promise<NftList[]> => {
  const response = await ApiV1.get(`marketplace/listings`);
  return response.data?.data?.listings || [];
};

export const getListings = async (
  pageNumber: number,
  sort: { key: string; value: 'ASC' | 'DESC' }[],
  filter?: string,
) => {
  return createActions(
    `marketplaceNftStatus`,
    async (dispatch: Dispatch, getState: GetState) => {
      const response = await ApiV1.get(
        `marketplace/new/listings?pageNumber=${pageNumber}&pageSize=10&sort=${JSON.stringify(
          sort,
        )}&filter=${filter}`,
      );
      dispatch({
        type: ActionType.SET_MARKETPLACE_LIST,
        payload: {
          list: {
            listing:
              pageNumber === 1
                ? response.data.data.listings
                : [
                    ...getState().marketPlaceNft.list.listing,
                    ...response.data.data.listings,
                  ],
            count: response.data.data.count,
          },
          pageNumber:
            response.data.data.listings.length === 0
              ? pageNumber - 1
              : pageNumber,
          sort: sort,
          isLoadMoreEnabled: response.data.data.listings.length >= 10,
        },
      });
    },
  );
};

export const getSalePreview = async (
  nftUuid: string,
  actions: previewSaleAction,
): Promise<MetaskyAPIWrap<GetMarketplacePreviewResponse>> => {
  const response = await ApiV1.get(
    `marketplace/preview-sale/${actions}/${nftUuid}`,
  );
  return response.data;
};

export const createListing = async (
  payload: CreateListingRequest,
): Promise<MetaskyAPIWrap<CreateListingResponse>> => {
  const response = await ApiV1.post(`marketplace/create-listing`, payload);
  return response.data;
};

export const updateListing = async (
  payload: UpdateListingRequest,
): Promise<MetaskyAPIWrap<CreateListingResponse>> => {
  const response = await ApiV1.post(`marketplace/update-listing`, payload);
  return response.data;
};

export const deleteListing = async (
  payload: DeleteListingRequest,
): Promise<MetaskyAPIWrap<CreateListingResponse>> => {
  const response = await ApiV1.post(`marketplace/delete-listing`, payload);
  return response.data;
};
