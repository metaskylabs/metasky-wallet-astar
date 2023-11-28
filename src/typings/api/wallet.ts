import { UserProfileResponse } from './profile';
import { transactionType } from '@constants/transaction';
import { TransactionOrderType, TransactionStatus } from '@utils/constants';
import { MediaType } from '@components/Shared/Card/Media';
import { LinkPayload } from './shared';
import { WalletCustodyType } from './auth';

export interface AccessBenefit {
  ctaLink: string;
  ctaLinkAs?: string;
  type: BenefitTypes;
  ctaTarget?: string;
  seceretText?: string;
  discord_text?: string;
  role?: { roleId: string; roleName: string };
  club_uuid?: string;
  media?: BenefitClaimMedia[];
}

export interface BenefitClaimMedia {
  url: string;
  key?: string;
  mimeType: BenefitClaimMimeType;
}

export type DiscordBenefitType = {
  clubID: string;
  text: string;
  skyclubLink: string;
  discordRoleName: string | null;
  linkToDiscordServer: string | null;
};

export enum BenefitTypes {
  MEDIA_BENEFIT = `Media`,
  SECRET_TEXT_BENEFIT = `Secret_Text`,
  DISCORD_ROLE_BENEFIT = `Discord_Role`,
  CUSTOM_BENEFIT = `Custom`,
  BENEFIT_STREAM = `BENEFIT_STREAM`,
}

export enum BenefitClaimMimeType {
  IMAGE_JPEG = `image/jpeg`,
  IMAGE_PNG = `image/png`,
  IMAGE_GIF = `image/gif`,
  IMAGE_SVG = `image/svg+xml`,
  VIDEO = `video/mp4`,
  AUDIO_MPEG = `audio/mpeg`,
  AUDIO_XWAV = `audio/x-wav`,
  AUDIO_WAV = `audio/wav`,
  ZIP = `application/zip`,
  PDF = `application/pdf`,
  CSV = `text/csv`,
}

export interface BenefitNftItem {
  nft_uuid: string;
  onchain_token_id: string;
  image: string;
  description: string;
  name: string;
  media_type: string;
}

export interface WalletBenefitsResponse {
  id: string;
  image: string;
  name: string;
  description: string;
  receivedDate: string;
  type: string;
  ctaLink: string;
  additionalData: {
    ctaLink: string;
  };
  audio_asset: string[] | null;
  startTime?: string;
  endTime?: string;
  ctaButton?: string;
  unClickable?: boolean;
  related_nfts?: BenefitNftItem[];
  expired?: boolean;
}

export interface BalanceTokensResponse {
  network_name: string;
  address_validator: string;
  asset_uuid: string;
  asset_name: string;
  asset_symbol: string;
  asset_logo: string;
  asset_media_type: string;
  no_of_asset: string;
  chain: string;
  native_currency?: { conversion_factor: number; currency: string };
  precision?: number;
}

export interface TokensListResponse {
  id: string;
  image: string;
  totalQuantity: number;
  media_type: MediaType;
  quantity: number;
  name: string;
  description: string;
  symbol: string;
  creator: {
    name: string;
    image: string;
  };
  collection: object;
  collection_new: collection;
  benefits: WalletBenefitsResponse[];
  properties: { [propertyName: string]: string };
  rarityPercentage: { [propertyName: string]: number };
  rarityRank: number | null;
  // NEW FIELDS added
  video: string;
  poster: string;
  on_sale?: boolean;
  sale_details?: {
    status: 'PENDING' | 'SUCCESS' | 'FAILED';
    tag: string;
    text: string;
    order_uuid: string;
    listing_uuid?: string;
  };
  revealStatus?: {
    revealButtonStatus: string;
    revealButtonText: string;
    showRevealButton: boolean;
  };
  blockchain?: {
    id: string;
    name: string;
  };
  status?: 'PENDING';
  order_uuid?: string;
  isOwner?: boolean;
  native_currency?: {
    conversion_factor: number;
    symbol: string;
  };
  alsoBuyListings?: SuggestedListing[];
  ctasToExplore?: LinkPayload[];
  listing_platform?: string;
  listing_url?: string;
  wallet_details?: {
    ethAddress: string;
    nearAddress: string;
    quantity: number;
    type: WalletCustodyType;
  }[];
  isDemoNFT?: boolean;
  disableTransfer?: boolean;
  disableSell?: boolean;
  transactions?: {
    id?: string;
  };
}

export interface TokenMainInfo {
  id: string;
  image: string;
  quantity: number;
  name: string;
  description: string;
  symbol: string;
  media_type: string;
  type: string;
}

export interface TokenDetails {
  summary: TokenMainInfo;
  metaData: {
    rarity: number;
    traits: any;
  };
  benefits: WalletBenefitsResponse[];
  creator: {
    id: string;
    name: string;
    image: string;
  };
  collection: {
    id: string;
    name: string;
    description: string;
  };
}

export interface traits {
  type: string;
  value: string;
  rarity: number;
}

export interface TransactionDetails {
  media_type: string | undefined;
  status_text: string | undefined;
  id: string;
  token: TokenMainInfo;
  quantity: string;
  from: UserProfileResponse;
  to: UserProfileResponse;
  note: string;
  createdAt: string;
  type: transactionType;
  status: TransactionStatus;
  explorer_link: string;
  price: string;
  currency: string;
  nft_buy_status: string;
  fiat_payment_status: OrderStatus;
  //TODO : ashish
  native_currency: { symbol: string; conversion_factor: number };
  order_type?: TransactionOrderType;
  auction_uuid?: string;
  fees: {
    name: string;
    display: number;
    type: any;
    value: any;
    currency: string;
  }[];
  totalFees: number;
  totalFeesFiat: number;
  totalFeesInr: number;
  sub_status: {
    title: string;
    metadata: [
      {
        text: string;
        action: {
          actionType: 'COPY' | 'URL';
          actionPlaceHolder: string;
          actionData: string;
        };
      },
    ];
    time: string;
    status: MicroTransactionStatus;
  }[];
}

export enum MicroTransactionStatus {
  PENDING = `PENDING`,
  COMPLETED = `COMPLETED`,
  FAILED = `FAILED`,
}

export enum OrderStatus {
  INIT = `INIT`,
  PENDING = `PENDING`,
  COMPLETED = `COMPLETED`,
  FAILED = `FAILED`,
  EXPIRED = `EXPIRED`,
}

export interface DoTransactionDetails {
  tokenId: string;
  quantity: number;
  fromWalletUUID: number;
  toWalletUUID: number;
  note: string;
}

export interface CollectionDetails {
  id: string;
  name: string;
  image: string;
  description: string;
  size: number;
}

export interface creator {
  id: string;
  image: string;
  name: string;
  walletUUID: number;
  contactNumber: string;
}

export enum TokensType {
  NFTS = `nfts`,
  UTILITY = `utility`,
  ALL = `all`,
}

export enum TicketUserInputType {
  MULTILINE_TEXT = `MULTILINE_TEXT`,
  SELECT = `SELECT`,
  SINGLELINE_TEXT = `SINGLELINE_TEXT`,
}

export type TicketUserInput = {
  id: string;
  type: TicketUserInputType;
  name: string;
  placeholder: string;
  validator?: string;
  options?: string[];
  value?: any;
};

export type SuggestedListing = {
  description: string;
  image: string;
  listing_uuid: string;
  max_quantity: number;
  media_type: string;
  name: string;
  skywallet_accepted_currency: string;
  skywallet_accepted_price: string;
  requires_physical_address?: boolean;
  userInputs?: TicketUserInput[];
};

export interface GetListingsRespone {
  currency?: string;
  id: string;
  isOwner: boolean;
  is_owner: boolean;
  quantity: number;
  image: string;
  poster: string;
  totalQuantity: number;
  description: string;
  name: string;
  listing_uuid: string;
  enableQuantitySelector?: boolean; // indicates whether to show the quantity selector
  maxLimitOnQuantitySelector?: number; // indicates max limit on qty selector
  maxPurchaseQuantity?: number;
  requires_physical_address?: boolean;
  revealStatus: {
    showRevealButton: boolean;
  };
  media_type: string;
  creator: {
    name: string;
  };
  collection: {
    id: string;
    name: string;
    image: string | null;
    description: string;
    size: number;
    creator: string;
  };
  collection_new: collection;
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
    available_quantity: string | number;
    campaign_id: string;
    exclusive: boolean;
  };
  creator_new: {
    name: string;
  };
  native_currency?: {
    conversion_factor: number;
    symbol: string;
  };
  is_listing_locked?: boolean;
  allowOffer?: boolean;
  recommendedAddOnListings?: SuggestedListing[];
  event_details?: { [key: string]: string };
  userInputs?: TicketUserInput[];
  terms_and_conditions?: string;
  listing_type?: string;
  version?: string;
  alsoBuyListings?: SuggestedListing[];
  ctasToExplore?: LinkPayload[];
}
export interface blockchain {
  id: string;
  name: string;
}

export interface WalletAnnouncementResponse {
  title: string;
  description: string;
  image: string;
  ctaLink: string | undefined;
  ctaType?: AnnouncementCtaType;
  backgroundColor: string;
}

export interface oneListingRequest {
  listing_uuid: string;
}

export interface Fees {
  name: string;
  type: string;
  value: string;
  currency: string;
  display: string;
}

export interface GetLoginMethodsPayload {
  clientId: string;
}

export interface GetCampaignLanderResponse {
  optional_fields?: any;
  show_screen?: boolean;
  required_fields?: any;
  campaign_id: string;
  banner_url: string;
  name: string;
  description: string;
  cta?: {
    ctaText?: string;
    ctaButton?: string;
    ctaLink?: string;
  };
  bannerTitle?: string;
  offeringTitle?: string;
  offerings?: {
    name: string;
    image?: string;
    description?: string;
    url?: string;
  }[];
  stepsTitle?: string;
  steps: { name: string; description?: string; url?: string }[];
  featuring?: {
    type?: string;
    title?: string;
    cta?: {
      type?: string;
      ctaLink?: string;
      ctaButton?: string;
      ctaTarget?: string;
    };
    data?: {
      benefitData?: {
        id?: string;
        image?: string;
        name?: string;
        description?: string;
        receivedDate?: string;
        startTime?: null;
        endTime?: string;
        ctaButton?: string;
      };
      topBid?: {
        currency?: string;
        amount?: string;
      };
    };
  }[];
  nfts?: {
    id: string;
    nft_uuid: string;
    onchain_token_id: string;
    supply: number;
    meta_data: {
      name: string;
      image: string;
      creator: string;
      media_type: string;
      description: string;
      totalQuantity: number;
    };
    quantity: number;
  }[];
  announcement?: {
    cta?: {
      ctaLink: string;
      ctaText?: string;
    };
    name?: string;
    heading?: string;
  };
}

export interface GetCampignConfigurationResponse {
  id: number;
  name: string;
  campaign_id: string;
  campaign_banner_url: string;
  default_chain: Chains;
  login_methods: LoginMethods[];
  additional_data: any;
  created_at: string;
  updated_at: string;
}

export interface BurnConfigRequestResponse {
  title: string;
  description: string;
  token_uuid: string;
  chain: string;
  chain_id: string;
  image: string;
  name: string;
  user_asset_details: {
    user_token_balance: number;
    user_token_burnt_count: number;
    wallet_uuid: string;
  }[];
  pebble_burn_factor: number;
  onchain_address?: string;
  media_type: string;
  type: string;
  cta_name: string;
  symbol: string;
  mint_listing_uuid: string;
}

export interface MintSignatureResponse {
  signature: string;
  payload: {
    message: any;
  };
}

export interface MintEligibilityResponse {
  [wallet_uuid: string]: {
    assetQBurnt: number;
    assetQMinted: number;
    conversionFactor: number;
    assetQMintMore: number;
  };
}

export enum Chains {
  ETHEREUM = `ETHEREUM`,
  NEAR = `NEAR`,
}

export enum LoginMethods {
  PHONE = `phone`,
  EMAIL = `email`,
  NEAR = `near`,
  METAMASK = `metamask`,
}

export enum AnnouncementCtaType {
  FUNCTION = `function`,
  PAGE = `page`,
  LINK = `link`,
}

export interface fetchAssetFile {
  assetLink: string;
  assetName: string;
}

export interface RaindropNftDetails {
  name: string;
  media: string;
  media_type: string;
  description: string;
}

export interface claimRaindropProps {
  bantaId: string;
  pin: string;
}

export interface DiscordGatingPayload {
  discordServerId: string;
  discordUserId: string;
}

export interface revealStatus {
  showRevealButton: boolean;
}

export interface collection {
  id: string;
  name: string;
  image: string | null;
  description: string;
  size: number | null;
  creator: string;
}

export interface blockchain {
  id: string;
  name: string;
}

export interface saleDetails {
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
}

export interface PaymentStatusResponse {
  status: OrderStatus;
}

export interface WalletAnnouncements {
  backgroundColor: string;
  ctaLink: string;
  ctaType: string;
  description: string;
  image: string;
  title: string;
}
