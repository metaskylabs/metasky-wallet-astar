import { ApiV1 } from '@actions/Axios';
import { MetaskyAPIWrap } from '@typings/api/wrapper';
import { FeedPreviewsResponse, feedDetailsResponse } from '@typings/api/feed';

export const getFeeds = async (): Promise<
  MetaskyAPIWrap<FeedPreviewsResponse>
> => {
  const response = await ApiV1.get(`/feed/feed-previews`);
  return response.data;
};

export const getFeedDetails = async (
  payload: string,
): Promise<MetaskyAPIWrap<feedDetailsResponse>> => {
  const response = await ApiV1.get(`/feed/${payload}`);
  return response.data;
};
