interface Fee {
  name: string;
  currency: string;
  value: number;
  value_in_inr: number;
}

export interface CreateListingRequest {
  nft_uuid: string;
  quantity: string;
  price: string;
}

export interface UpdateListingRequest {
  listing_uuid: string | undefined;
  price: string;
}

export interface DeleteListingRequest {
  listing_uuid: string | undefined;
}

export enum previewSaleAction {
  CREATE = `create`,
  UPDATE = `update`,
  DELETE = `delete`,
}
export interface CreateListingResponse {
  order_uuid: string;
  listing: string;
}

export interface GetMarketplacePreviewResponse {
  fees: {
    currency: string;
    value: number;
    value_in_inr: number;
    fees_breakup: Fee[];
  };
  commission_from_sale: {
    type: string;
    value: number;
  };
  royalty_from_sale: {
    type: string;
    value: number;
  };
  recharge: {
    is_required: boolean;
    destination_currency: string;
    destination_value: number;
    deposit_currency: string;
    deposit_value: number;
    maximum_pg_amount?: number;
    minimum_pg_amount: number;
  };
  conversion_config: {
    destination_currency: string;
    deposit_currency: string;
    rate: number;
  };
}
