import { WalletBenefitsResponse } from './wallet';

export interface NftList {
  id: string;
  image: string;
  totalQuantity: number;
  media_type: string;
  quantity: number;
  name: string;
  collectionName?: string;
  poster: string;
  description: string;
  symbol: string;
  creator: {
    name: string;
    image: string;
  };
  collection: {
    name: string | null;
  };
  collection_new: collection | null;
  listing_uuid?: string;
  properties: object[];
  marketplace_id: string;
  nft_uuid: string;
  price: string;
  skywallet_accepted_price: string;
  skywallet_accepted_currency: string;
  metamask_accepted_price: string;
  metamask_accepted_currency: string;
  currency: string;
  seller: string;
  total_quantity: number;
  available_quantity: number;
  campaign_id: string;
  exclusive: boolean;
  action_text: string;
  action: string;
  rarityRank: number | null;
  need_kyc: boolean;
  benefits: WalletBenefitsResponse[];
  on_sale?: boolean;
  sale_details?: {
    status: 'PENDING' | 'SUCCESS' | 'FAILED';
    tag: string;
    text: string;
    order_uuid: string;
  };
  /**
   * Reveal data
   */
  revealStatus?: {
    revealButtonStatus: string;
    revealButtonText: string;
    showRevealButton: boolean;
  };
  /** Pending NFT Keys */
  status?: 'PENDING';
  order_uuid?: string;
  offerings?: {
    offered: boolean;
    title: string;
  }[];
  directRedirect?: {
    cta?: string;
  };
}

export interface collection {
  id: string;
  name: string;
  image: string;
  media_type: string;
  size: string;
  creator: string;
}
