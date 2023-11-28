import { Fees } from '@typings/api/wallet';

export interface buyListingRequest {
  order_uuid: string;
  upi_id?: string;
}

export interface AirpayData {
  privatekey: string;
  checksum: string;
  mid: string;
  airpayCurrency: string;
  isocurrency: string;
  chmod: string;
  arpyVer: string;
  amount: string;
  currency: string;
  user: {
    id: string;
    email: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
  };
}

export interface buyListingResponse {
  qrCode?: string;
  userId: string;
  paymentUrl: string;
  order_uuid: string;
  amount: number;
  currency: string;
  paymentGateway?: string;
  orderId: string;
  //In case of airpay
  metaData?: AirpayData;
}

export type BuyOnMetaResponse = {
  id: string;
  order_uuid: string;
  userId: string;
  successRedirectUrl: string;
  failureRedirectUrl: string;
  paymentUrl: string;
  amount: string;
  currency: string;
  status: string;
  walletAddress: string;
  paymentGateway: 'ONMETA';
  chainId: string;
  tokenAddress: string;
};

/* typeguard to detect type of response */
export const isPurchaseFromOnMeta = (
  listingResponse: buyListingResponse | BuyOnMetaResponse,
): listingResponse is BuyOnMetaResponse => {
  return listingResponse.paymentGateway === `ONMETA`;
};

export interface GetPaymentGatewayResponse {
  id: number;
  paymentGateway: string;
  status: string;
  paymentFlow: boolean;
}

export interface listingPreviewRequest {
  listingId: string;
  marketplaceId: string;
  qty: number;
  payment_mode?: string;
  addOnListings?: {
    listing_uuid: string;
    quantity: number;
  }[];
  coupon_code?: string;
  userInputs?: any;
  wallet_uuid?: string;
  additional_data?: any;
}

export interface AddOnOrder {
  nft: {
    id: string;
    image: string;
    quantity: number;
    name: string;
    media_type: string;
    poster: string;
  };
  currency: string;
  value: string;
  reference: string;
  totalPaymentINR: string;
  success: boolean;
  totalFeesInr: string;
  fees: Fees[];
}

export interface listingPreviewResponse {
  details: {
    order_uuid: string;
    reference: string;
    nft: {
      id: string;
      contractAddress: string;
      image: string;
      quantity: string;
      name: string;
      media_type: string;
    };
    native_currency: {
      currency: string;
      value: string;
    };
    currency: string;
    value: string;
  };
  fees: Fees[];
  nativeFees: Fees[];
  addOnOrders?: AddOnOrder[];
  listingId: string;
  need_kyc: boolean;
  totalPaymentFiatIncludingAddons: string;
  totalPaymentNativeIncludingAddons: {
    currency: string;
    value: number;
  };
  totalFeesNativeIncludingAddons: {
    currency: string;
    value: number;
  };
  feesIncludingAddons: Fees[];
  totalFeesFiatIncludingAddons: string;
  payment_mode: string;
  disableOnMetaBanner?: boolean;
}
export interface UpiRequest {
  upi_id: string;
}
export interface UpiResponse {
  status: UpiStatus; //TODO: add enum
  message: string;
}

export enum UpiStatus {
  VERIFIED = `VERIFIED`,
  ERROR = `ERROR`,
}
export interface VerifyPanRequest {
  pan_number: string;
  name_on_pan: string;
  birth_day_on_pan: string;
  birth_month_on_pan: string;
  birth_year_on_pan: string;
}

export interface VerifyPanResponse {
  pan_verified: boolean;
}

export interface PreviewAndBuyingListingPayload {
  listingId: string;
  marketplaceId: string;
  quantity: number;
}

export interface PreviewAndBuyingListingResponse {
  payment_link?: null;
  order_uuid: string;
}

export interface PollingTransactionPayload {
  orderId: string;
}
export interface ValidateCouponPayload {
  listing_uuid: string;
  coupon_code: string;
}
export interface ValidateCouponResponse {
  isCouponValid: boolean;
}

export interface PaymentMethodOptionRequest {
  listing_uuid: string;
  quantity: number;
}

export interface PaymentMethodOptionResponse {
  payment_modes: string[];
}
