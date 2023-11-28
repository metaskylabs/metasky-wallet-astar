import { TokensListResponse } from '@typings/api/wallet';
import { LinkPayload } from './shared';

export interface GetAuctionDetailsPayload {
  auctionId: string;
}

export interface NftAuctionDetails {
  nft_details: TokensListResponse;
  auction_details: AuctionDetails;
  conversion_factor: {
    symbol: string;
    conversion_factor: number;
  };
  ctasToExplore?: LinkPayload[];
}

export interface AuctionDetails {
  creator: string;
  auction_end_time: string;
  auction_uuid: string;
  bid_currency: string;
  next_valid_bet_amount: string;
  is_out_bid: boolean;
  is_top_bid: boolean;
  bid_placed: boolean;
  top_bid?: AuctionOffers;
  bids: AuctionOffers[];
  user_bids?: AuctionOffers[];
}

export interface AuctionOffers {
  bid_uuid: string;
  status: BidStatus;
  currency: string;
  amount: string;
  bid_time: string;
  bidder: AuctionBidderDetails;
}

export interface AuctionBidderDetails {
  user_uuid: string;
  name?: string;
  email?: string;
  image?: string;
  ph_no?: string;
  identifier: string;
}

export enum BidStatus {
  TOP_BID = `Top Bid`,
  OUT_BID = `Outbid`,
  PROCESSING_BID = `Processing`,
}

export interface AuctionNewBidPayload {
  auctionId: string;
  amount: number;
}

export interface AuctionNewBidResponse {
  bid: AuctionOffers;
  auction_details: AuctionDetails;
  conversion_factor: {
    symbol: string;
    conversion_factor: number;
  };
}
