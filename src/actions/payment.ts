import { ApiV1 } from '@actions/Axios';

import { MetaskyAPIWrap } from '@typings/api/wrapper';
import {
  buyListingRequest,
  buyListingResponse,
  BuyOnMetaResponse,
  GetPaymentGatewayResponse,
  listingPreviewRequest,
  listingPreviewResponse,
  PaymentMethodOptionRequest,
  PaymentMethodOptionResponse,
  PollingTransactionPayload,
  PreviewAndBuyingListingPayload,
  PreviewAndBuyingListingResponse,
  UpiRequest,
  UpiResponse,
  ValidateCouponPayload,
  ValidateCouponResponse,
  VerifyPanRequest,
  VerifyPanResponse,
} from '@typings/api/payment';
import { PaymentStatusResponse, TransactionDetails } from '@typings/api/wallet';

export const getPreviewDetails = async (
  payload: listingPreviewRequest,
): Promise<MetaskyAPIWrap<listingPreviewResponse>> => {
  const response = await ApiV1.post(`marketplace/preview-listing`, {
    listingId: payload.listingId,
    marketplaceId: payload.marketplaceId,
    quantity: payload.qty,
    payment_mode: payload.payment_mode,
    addOnListings: payload.addOnListings,
    coupon_code: payload.coupon_code,
    userInputs: payload.userInputs,
    wallet_uuid: payload.wallet_uuid,
    additional_data: payload.additional_data,
  });

  return response.data;
};

export const buyListing = async (
  payload: buyListingRequest,
): Promise<MetaskyAPIWrap<buyListingResponse | BuyOnMetaResponse>> => {
  const response = await ApiV1.post(`marketplace/buy-listing`, payload);

  return response.data;
};

export const getPaymentGateway = async (
  order_uuid: string,
): Promise<MetaskyAPIWrap<GetPaymentGatewayResponse>> => {
  const response = await ApiV1.get(`marketplace/pg/${order_uuid}`);

  return response.data;
};

export const verifyUpi = async (
  payload: UpiRequest,
): Promise<MetaskyAPIWrap<UpiResponse>> => {
  const response = await ApiV1.post(`marketplace/verify-upi`, payload);

  return response.data;
};

export const verifyPan = async (
  payload: VerifyPanRequest,
): Promise<MetaskyAPIWrap<VerifyPanResponse>> => {
  const response = await ApiV1.post(`/kyc/verifyPan`, payload);

  return response.data;
};
export const previewAndBuyingListing = async (
  payload: PreviewAndBuyingListingPayload,
): Promise<MetaskyAPIWrap<PreviewAndBuyingListingResponse>> => {
  const response = await ApiV1.post(
    `/marketplace/previewAndBuyListing`,
    payload,
  );

  return response.data;
};
export const pollingTransaction = async (
  payload: PollingTransactionPayload,
): Promise<MetaskyAPIWrap<TransactionDetails>> => {
  const response = await ApiV1.get(`/wallet/transactions/${payload.orderId}`);

  return response.data;
};

/**
 * Reveal NFT API Integration
 * Move types to appropriate files
 */
export const hatchAndaNFT = async (payload: {
  nft_uuid: string;
}): Promise<
  MetaskyAPIWrap<{
    success: boolean;
  }>
> => {
  const response = await ApiV1.post(
    `/marketplace/nft/reveal/${payload.nft_uuid}`,
  );
  return response.data;
};

export const pollPaymentStatus = async (
  payload: PollingTransactionPayload,
): Promise<MetaskyAPIWrap<PaymentStatusResponse>> => {
  const response = await ApiV1.get(`/payment/status/${payload.orderId}`);
  return response.data;
};

export const validateCoupon = async (
  payload: ValidateCouponPayload,
): Promise<MetaskyAPIWrap<ValidateCouponResponse>> => {
  const response = await ApiV1.post(
    `/marketplace/coupon/validate-coupon`,
    payload,
  );
  return response.data;
};

export const getPaymentOptions = async (
  payload: PaymentMethodOptionRequest,
): Promise<MetaskyAPIWrap<PaymentMethodOptionResponse>> => {
  const response = await ApiV1.get(
    `/marketplace/payment-options/${payload.listing_uuid}?quantity=${payload.quantity}`,
  );
  return response.data;
};
