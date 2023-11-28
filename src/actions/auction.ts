import { ApiV1 } from '@actions/Axios';
import { MetaskyAPIWrap } from '@typings/api/wrapper';
import {
  AuctionNewBidPayload,
  AuctionNewBidResponse,
  GetAuctionDetailsPayload,
  NftAuctionDetails,
} from '@typings/api/auctions';

export const getAuctionDetails = async (
  payload: GetAuctionDetailsPayload,
): Promise<MetaskyAPIWrap<NftAuctionDetails>> => {
  const response = await ApiV1.get(`auction/auction/${payload.auctionId}`);

  return response.data;
};

export const newBid = async (
  payload: AuctionNewBidPayload,
): Promise<MetaskyAPIWrap<AuctionNewBidResponse>> => {
  const response = await ApiV1.post(`auction/auction/${payload.auctionId}`, {
    amount: payload.amount,
  });

  return response.data;
};
