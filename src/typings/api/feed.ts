import { MediaType } from '@components/Shared/Card/Media';

export interface FeedPreviewsResponse {
  totalCount: number;
  feeds: FeedType[];
}

export interface FeedType {
  index: number;
  feed_uuid: string;
  heading: string;
  mediaType: MediaType;
  mediaLink: string;
  isActive: boolean;
  isViewed: boolean;
}

export interface feedDetailsResponse {
  feed_uuid: string;
  heading: string;
  mediaType: MediaType;
  mediaLink: string;
  content: string;
  isActive: boolean;
  isViewed: boolean;
  created_at: string;
  updated_at: string;
}
