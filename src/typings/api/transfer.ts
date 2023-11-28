import { Fees, OrderStatus } from '@typings/api/wallet';
import { AirpayData, BuyOnMetaResponse } from '@typings/api/payment';

export interface ConfirmTransferPayload extends MakeTransferPayload {
  image?: string;
  media_type?: string;
  name?: string;
}

export interface MakeTransferPayload {
  transactionAmountDetail?: string;
  token_uuid: string;
  nft_uuid: string;
  ph_no?: string;
  to_address: string;
  quantity: string;
  note: string;
}

export interface MakeTransferRespone {
  id: number;
  order_uuid: string;
  type: string;
  status: OrderStatus;
  note: string;
  additional_data: {
    fees: Fees[];
    quantity: string;
  };
  reference: string | null;
  created_at: string;
  updated_at: string;
}

export interface PreviewTransferPayload {
  nft_uuid: string;
  token_uuid: string;
  ph_no?: string;
  to_address: string;
  quantity: string;
}

export interface PreviewTransferResponse {
  fees: {
    currency: string;
    value: number;
    value_in_inr: number;
    fiat_currency: string;
    value_in_fiat: number;
    fees_breakup: FeesBreakup[];
  };
  user_balance: {
    [currency: string]: any;
    Fiat: number;
    fiat_currency: string;
  };
  recharge: {
    is_required: boolean;
    destination_currency: string;
    destination_value: string | null;
    deposit_currency: string;
    deposit_value: string | null;
    minimum_pg_amount: string;
    maximum_pg_amount?: number;
    feesWithRecharge: {
      currency: string;
      value: number;
      value_in_inr: number;
      fiat_currency: string;
      value_in_fiat: number;
      fees_breakup: FeesBreakup[];
    };
  };
  conversion_config: {
    destination_currency: string;
    deposit_currency: string;
    rate: number;
  };
  disableOnMetaBanner?: boolean;
}

export interface FeesBreakup {
  name: string;
  currency: string;
  value: number;
  fiat_currency: string;
  value_in_fiat: number;
  value_in_inr: number;
}

export interface WalletBalanceResponse {
  address_validator: string;
  asset_uuid: string;
  name: string;
  no_of_asset: string;
  image: string;
  media_type: string;
  network_name?: string;
}

export interface BuyNearPayload {
  inr_amount: string;
  upi_id?: string;
  parent_order_id: string;
}

export interface BuyCoinPayload {
  fiat_amount: string;
  fiat_currency?: string;
  parent_order_id?: string;
  coin_name: string | undefined;
}

export interface BuyNearResponse {
  qrCode?: string;
  userId: string;
  amount: number;
  currency: string;
  paymentGateway: string;
  paymentUrl?: string;
  order_uuid: string;
  orderId: string;
  metaData?: AirpayData;
}

/* typeguard to detect type of response */
export const isBuyFromOnMeta = (
  listingResponse: BuyNearResponse | BuyOnMetaResponse,
): listingResponse is BuyOnMetaResponse => {
  return listingResponse.paymentGateway === `ONMETA`;
};

export interface PreviewBuyCoinPayload {
  fiat_amount: string;
  fiat_currency?: string;
  coin_name: string | undefined;
}

export interface PreviewBuyCoinPayloadResponse {
  fees: {
    currency: string;
    value: number;
    value_in_inr: number;
    fiat_currency: string;
    value_in_fiat: number;
    fees_breakup: FeesBreakup[];
  };
  user_balance: {
    [currency: string]: any;
    Fiat: number;
    fiat_currency: string;
  };
  recharge: {
    destination_currency: string;
    destination_value: number;
    deposit_currency: string;
    deposit_value: number;
    min_recharge_fiat_amount: number;
    destination_fiat_value: number;
    deposit_coin_value: number;
  };
  conversion_config: {
    destination_currency: string;
    deposit_currency: string;
    rate: string;
  };
}
