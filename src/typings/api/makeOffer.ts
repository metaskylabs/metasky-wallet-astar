import { OfferFilter } from '@utils/constants';

export interface MakeOfferPayload {
  nft_uuid: string | undefined;
  currency: string;
  amount: number;
}

export interface NFTOfferListPayload {
  nftId: string;
  sort: { key: string; direction: 'ASC' | 'DESC' }[];
}

export interface NFTOfferPayload {
  pageNumber: number;
  sort?: { key: string; direction: 'ASC' | 'DESC' }[];
  filter: {
    key: string;
    operator: string;
    value: OfferFilter;
  }[];
  search: string;
}

export interface MakeOfferRespone {
  nft_uuid: string;
  auction_uuid: string;
  created_at: string;
  updated_at: string;
  currency: string;
  amount: string;
  status: string;
  additional_data?: object;
}

export interface NFTData {
  name: string;
  image: string;
  creator: string;
  media_type: string;
  description: string;
  totalQuantity: number;
}

export interface autionResponse {
  user_uuid: string;
  name: string;
  email: string | null;
  image: string | null;
  ph_no?: string | null;
}

export interface NFTConversionFactor {
  symbol: string;
  conversion_factor: number;
}

export interface NFTOfferList {
  auction_uuid: string;
  nft_uuid: string;
  nft_data: NFTData;
  status: string;
  currency: string;
  amount: string;
  current_price: string;
  created_at: string;
  buyer: autionResponse;
  owner?: autionResponse;
  conversion_factor: NFTConversionFactor;
  is_buyer?: boolean;
  is_owner?: boolean;
}

export interface feesBreakupResponse {
  name: string;
  currency: string;
  type: string;
  value: number;
  display: number;
}

export interface feesResponse {
  currency: string;
  value: number;
  value_in_inr: number;
  fees_breakup: feesBreakupResponse[];
}

export interface userBalanceResponse {
  INR: number;
  NEAR: number;
}

export interface salesResponse {
  type: string;
  value: string;
}

export interface rechargeResponse {
  is_required: boolean;
  destination_currency: string;
  destination_value: string | null;
  deposit_currency: string | null;
  deposit_value: string | null;
  minimum_pg_amount: number;
  maximum_pg_amount: number;
}

export interface conversionConfigResponse {
  destination_currency: string;
  deposit_currency: string;
  rate: number;
}

export interface previewOffer {
  fees: feesResponse;
  user_balance: userBalanceResponse;
  commission_from_sale: salesResponse;
  royalty_from_sale: salesResponse;
  recharge: rechargeResponse;
  conversion_config: conversionConfigResponse;
}

export interface DeleteOfferRespone {
  auction_uuid: string;
}

export interface AcceptOfferRespone {
  order_uuid: string;
  listing_uuid: string;
  auction_uuid: string;
}

export interface RejectOfferRespone {
  auction_uuid: string;
}
