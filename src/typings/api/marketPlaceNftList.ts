import { WalletBenefitsResponse } from './wallet';

export interface MarketPlaceNftList {
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
  currency: string;
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
    seller: string;
    total_quantity: string;
    available_quantity: string;
    campaign_id: string;
    exclusive: boolean;
  };
}

export interface blockchain {
  id: string;
  name: string;
}
