import { WalletBenefitsResponse } from './wallet';

export interface CollectionNftList {
  id: string;
  isOwner: boolean;
  quantity: number;
  image: string;
  poster: string;
  totalQuantity: number;
  description: string;
  name: string;
  revealStatus: {
    showRevealButton: boolean;
  };
  media_type: string;
  creator_new: {
    name: string;
  };
  creator: string;
  collection: string;
  collection_new: {
    id: string;
    name: string;
    image: string | null;
    description: string;
    size: number;
    creator: string;
  };
  rarityPercentage: { [propertyName: string]: number } | null;
  action_text: string;
  rarityRank: number;
  benefits: WalletBenefitsResponse[];
  on_sale: boolean;
  showAnimationInPurchase: boolean;
  need_kyc: boolean;
  previewAndBuyAtOnce: boolean;
  blockchain?: blockchain;
  properties: { [propertyName: string]: string };
  nft_uuid: string;
  sale_details?: {
    listing_uuid: string;
    marketplace_id: string;
    skywallet_accepted_price: string;
    skywallet_accepted_currency: string;
    price: string;
    currency: string;
    metamask_accepted_price: string;
    metamask_accepted_currency: string;
    seller: string;
    total_quantity: string;
    available_quantity: string;
    campaign_id: string;
    exclusive: boolean;
    maxPurchaseQuantity?: number;
  };
  recommendedAddOnListings?: {
    description: string;
    image: string;
    listing_uuid: string;
    max_quantity: number;
    media_type: string;
    name: string;
    skywallet_accepted_currency: string;
    skywallet_accepted_price: string;
  }[];
}

export interface blockchain {
  id: string;
  name: string;
}
