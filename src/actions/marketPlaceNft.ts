import { ApiV1 } from './Axios';
import { MetaskyAPIWrap } from '@typings/api/wrapper';
import {
  CreateListingRequest,
  CreateListingResponse,
  DeleteListingRequest,
  GetMarketplacePreviewResponse,
  previewSaleAction,
  UpdateListingRequest,
} from '@typings/api/marketplace';

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
